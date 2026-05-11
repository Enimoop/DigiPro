from django.db import migrations


def assert_no_duplicate_emails(apps, schema_editor):
    if schema_editor.connection.vendor != "postgresql":
        return

    with schema_editor.connection.cursor() as cursor:
        cursor.execute(
            """
            SELECT lower(email) AS normalized_email, COUNT(*)
            FROM auth_user
            WHERE email <> ''
            GROUP BY lower(email)
            HAVING COUNT(*) > 1
            ORDER BY normalized_email
            LIMIT 5
            """
        )
        duplicates = cursor.fetchall()

    if duplicates:
        formatted = ", ".join(
            f"{email} (x{count})" for email, count in duplicates
        )
        raise RuntimeError(
            "Impossible d'ajouter la contrainte unique sur auth_user.email: "
            f"emails dupliques detectes: {formatted}."
        )


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0003_profile"),
        ("auth", "0012_alter_user_first_name_max_length"),
    ]

    operations = [
        migrations.RunPython(assert_no_duplicate_emails, migrations.RunPython.noop),
        migrations.RunSQL(
            sql=(
                "CREATE UNIQUE INDEX auth_user_email_ci_unique "
                "ON auth_user (lower(email)) "
                "WHERE email <> '';"
            ),
            reverse_sql="DROP INDEX IF EXISTS auth_user_email_ci_unique;",
        ),
    ]
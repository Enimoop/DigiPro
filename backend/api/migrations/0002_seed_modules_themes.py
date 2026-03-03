from django.db import migrations


def seed_data(apps, schema_editor):
    Module = apps.get_model("api", "Module")
    Theme = apps.get_model("api", "Theme")

    # =====================
    # MODULES
    # =====================

    bureautique = Module.objects.create(
        slug="bureautique",
        title="Bureautique",
        description="Maîtriser les outils bureautiques essentiels.",
        icon="monitor",
        enabled=True,
        order=1,
    )

    email = Module.objects.create(
        slug="email",
        title="Email",
        description="Utiliser efficacement sa boîte mail.",
        icon="mail",
        enabled=True,
        order=2,
    )

    cyber = Module.objects.create(
        slug="cybersecurite",
        title="Cybersécurité",
        description="Protéger ses comptes et ses données en ligne.",
        icon="lock",
        enabled=True,
        order=3,
    )

    # =====================
    # THEMES
    # =====================

    Theme.objects.create(
        module=cyber,
        slug="passwords",
        title="Mots de passe",
        description="Créer et gérer des mots de passe sécurisés.",
        enabled=True,
        order=1,
    )

    Theme.objects.create(
        module=email,
        slug="phishing",
        title="Reconnaître les mails de phishing",
        description="Identifier les signes d'un mail frauduleux.",
        enabled=True,
        order=1,
    )

    Theme.objects.create(
        module=bureautique,
        slug="bases",
        title="Introduction à la bureautique",
        description="Reconnaître les différents types de fichiers et les logiciels associés.",
        enabled=True,
        order=1,
    )


def reverse_seed_data(apps, schema_editor):
    Module = apps.get_model("api", "Module")
    Theme = apps.get_model("api", "Theme")

    Theme.objects.all().delete()
    Module.objects.all().delete()


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0001_initial"),
    ]

    operations = [
        migrations.RunPython(seed_data, reverse_seed_data),
    ]
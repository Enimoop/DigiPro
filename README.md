# DigiPro — Setup local 

Ce repo contient une application **Django (API + auth cookies/JWT)** + **React (Dashkit / React-Bootstrap)** + **PostgreSQL**, orchestrés avec **Docker Compose**.

---

## Prérequis

* **Docker Desktop** ou docker juste 
* **Node.js** -> 22.12 
vous pouvez installer nvm pour gérer les versions de node si vous en avez plusieurs

---

## Structure (typique)

* `backend/` : Django (API)
* `frontend/` : React (Vite)
* `docker-compose.yml` : services `db`, `backend`
* `.env` : variables d’environnement (DB, Django…)


---

## Variables d’environnement (.env)

Créer un fichier `.env` à la racine avec au minimum :

```env
DB_NAME=DigiPro
DB_USER=admin
DB_PASSWORD=admin
DB_HOST=db
DB_PORT=5432

DJANGO_DEBUG=1
DJANGO_SECRET_KEY=change-me-in-prod

CORS_ALLOWED_ORIGINS=http://127.0.0.1:5173
CSRF_TRUSTED_ORIGINS=http://127.0.0.1:5173
```

---

## Lancer en local (première fois)

### 1) Démarrer Postgres + Django (Docker)

Depuis la racine du projet :

```bash
docker compose up -d --build
```

Vérifier que les conteneurs sont up :

```bash
docker compose ps
```

### 2) Initialiser la base (migrations Django)

Les tables Django **ne se créent pas toutes seules** tant que les migrations ne sont pas appliquées.

```bash
docker compose exec backend python manage.py migrate
```


### 3) Créer un superuser (admin Django)

c'est pas obligatoire ça permet juste d'accéder à l'admin de django

```bash
docker compose exec backend python manage.py createsuperuser
```

### 4) Accéder à l’admin / API

* Admin Django : `http://localhost:8000/admin/`
* API test : `http://localhost:8000/api/me/` (protégé, nécessite auth)

---

## Lancer le front (React)

```bash
cd frontend
npm install
npm run dev
```

Le front est dispo sur : `http://127.0.0.1:5173/`


---

## Auth (résumé)

* Le login/register se fait côté Django et pose des **cookies httpOnly** :

  * `access_token`
  * `refresh_token`
* Le front utilise `axios` avec :

  * `withCredentials: true`
* Endpoint CSRF :

  * `GET /api/csrf/` (pose le cookie csrftoken)

---

## Endpoints utiles

* `GET /api/csrf/` : init CSRF
* `POST /api/auth/register/` : créer un compte
* `POST /api/auth/login/` : se connecter
* `POST /api/auth/logout/` : logout
* `POST /api/auth/refresh/` : refresh access token
* `GET /api/me/` : infos user connecté (protégé)

---

## Premier lancement

Checklist rapide :

1. Installer Docker Desktop
2. Cloner le repo
3. Créer `.env` et le remplir
4. `docker compose up -d --build`
5. `docker compose exec backend python manage.py migrate`
6. `docker compose exec backend python manage.py createsuperuser`
7. Lancer le front :

   * `cd frontend`
   * `npm install`
   * `npm run dev`
8. Tester :

   * `http://127.0.0.1:5173/`


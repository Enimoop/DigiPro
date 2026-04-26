# Documentation de passation — DigiPro95

> Dernière mise à jour : avril 2026

---

## Table des matières

1. [Présentation du projet](#1-présentation-du-projet)
2. [Comment ça fonctionne (côté utilisateur)](#2-comment-ça-fonctionne-côté-utilisateur)
3. [Architecture technique](#3-architecture-technique)
4. [Stack technologique](#4-stack-technologique)
5. [Base de données](#5-base-de-données)
6. [API — Endpoints disponibles](#6-api--endpoints-disponibles)
7. [Authentification](#7-authentification)
8. [Comment le contenu est chargé](#8-comment-le-contenu-est-chargé)
9. [Structure des fichiers](#9-structure-des-fichiers)
10. [Lancer le projet en local](#10-lancer-le-projet-en-local)
11. [Variables d'environnement](#11-variables-denvironnement)
12. [Déploiement en production](#12-déploiement-en-production)
13. [Points d'attention et pistes d'évolution](#13-points-dattention-et-pistes-dévolution)

---

## 1. Présentation du projet

**DigiPro95** est une plateforme de **formation en ligne aux compétences numériques de base**, pensée pour des publics peu à l'aise avec l'informatique.

L'objectif est simple : guider l'utilisateur à travers des **modules thématiques**, chacun structuré en trois étapes progressives :

1. **Leçon** — lecture de contenu pédagogique illustré
2. **Quiz** — questions à choix multiples pour valider la compréhension
3. **Jeu** — activité interactive pour consolider les acquis

La progression de chaque utilisateur est enregistrée en base de données. Un **tableau de bord personnel** permet de visualiser l'avancement par module.

### Modules disponibles

| Module | Thème | Description |
|---|---|---|
| Bureautique | Introduction à la bureautique (`bases`) | Reconnaître les types de fichiers et logiciels |
| Email | Reconnaître les mails de phishing (`phishing`) | Identifier un mail frauduleux |
| Cybersécurité | Mots de passe (`passwords`) | Créer et gérer des mots de passe sécurisés |

---

## 2. Comment ça fonctionne (côté utilisateur)

### Parcours classique

```
Inscription / Connexion
        ↓
Accueil (liste des modules)
        ↓
Sélection d'un module  →  Voir les thèmes disponibles + sa progression
        ↓
Sélection d'un thème   →  Leçon (lecture des slides)
        ↓
                           Quiz (questions + score enregistré)
        ↓
                           Jeu interactif (valide la complétion du thème)
        ↓
Tableau de bord  →  Voir sa progression globale
```

### Onboarding

À la **première connexion**, un tour guidé (tooltip pas-à-pas) présente les éléments de l'interface à l'utilisateur. Ce tour n'est affiché qu'une seule fois : une fois terminé ou fermé, il ne réapparaît plus. L'état "a vu l'onboarding" est stocké en base.

### Progression

La progression est calculée par **thème** :
- `progress_pct` : pourcentage obtenu au quiz (0–100)
- `completed` : booléen passé à `true` quand l'utilisateur termine le jeu

Le tableau de bord agrège ces données pour afficher une barre de progression par module.

---

## 3. Architecture technique

Le projet est composé de **trois services** orchestrés avec Docker Compose :

```
┌─────────────────────────────────────────────────────────┐
│                      Navigateur                         │
│              React SPA (port 5173 en dev)               │
└───────────────────────┬─────────────────────────────────┘
                        │ HTTP / JSON (Axios)
                        │ cookies httpOnly (JWT)
┌───────────────────────▼─────────────────────────────────┐
│               Django REST Framework                      │
│                  (port 8000)                             │
│  - Auth (JWT en cookies)                                 │
│  - API modules / thèmes                                  │
│  - API progression utilisateur                           │
└───────────────────────┬─────────────────────────────────┘
                        │ psycopg3
┌───────────────────────▼─────────────────────────────────┐
│              PostgreSQL 16 (port 5432)                   │
└─────────────────────────────────────────────────────────┘
```

En production, un **Nginx** sert le build statique du frontend et agit comme reverse proxy vers le backend.

---

## 4. Stack technologique

### Backend

| Élément | Technologie |
|---|---|
| Framework | Django 5+ |
| API | Django REST Framework |
| Auth | djangorestframework-simplejwt |
| CORS | django-cors-headers |
| Driver PostgreSQL | psycopg3 |
| Serveur WSGI prod | Gunicorn |

### Frontend

| Élément | Technologie |
|---|---|
| Framework UI | React 19 + TypeScript |
| Build | Vite |
| UI Kit | React-Bootstrap + Bootstrap 5 + thème Dashkit |
| Routing | React Router DOM v7 |
| Requêtes HTTP | Axios |
| Rendu Markdown | react-markdown + rehype-raw |
| Tour onboarding | @reactour/tour |
| Force de MDP | @zxcvbn-ts |
| Icônes | feather-icons-react |

### Infrastructure

| Élément | Technologie |
|---|---|
| Conteneurs | Docker Compose |
| Base de données | PostgreSQL 16 |
| Serveur statique / reverse proxy (prod) | Nginx |

---

## 5. Base de données

### Modèles

#### `Module`

Représente un module de formation (ex: "Cybersécurité").

| Champ | Type | Description |
|---|---|---|
| `slug` | SlugField (unique) | Identifiant URL (ex: `cybersecurite`) |
| `title` | CharField | Nom affiché |
| `description` | TextField | Description courte |
| `icon` | CharField | Nom d'icône Feather (ex: `lock`) |
| `enabled` | BooleanField | Visible ou non |
| `order` | PositiveIntegerField | Ordre d'affichage |

#### `Theme`

Sous-chapitre d'un module (ex: "Mots de passe" dans "Cybersécurité").

| Champ | Type | Description |
|---|---|---|
| `module` | FK → Module | Module parent |
| `slug` | SlugField | Identifiant (ex: `passwords`) — unique **par module** |
| `title` | CharField | Nom affiché |
| `description` | TextField | Description courte |
| `enabled` | BooleanField | Visible ou non |
| `order` | PositiveIntegerField | Ordre d'affichage |

#### `UserThemeProgress`

Suivi de progression d'un utilisateur sur un thème donné.

| Champ | Type | Description |
|---|---|---|
| `user` | FK → User | L'utilisateur |
| `theme` | FK → Theme | Le thème concerné |
| `completed` | BooleanField | `true` quand le jeu est terminé |
| `progress_pct` | PositiveSmallIntegerField (0–100) | Score obtenu au quiz |
| `started_at` | DateTimeField | Date de début (auto) |
| `updated_at` | DateTimeField | Dernière mise à jour (auto) |

> Contrainte : un seul enregistrement par couple `(user, theme)`.

#### `Profile`

Extension du modèle utilisateur Django, créée automatiquement via un **signal** (`post_save`) à chaque création de compte.

| Champ | Type | Description |
|---|---|---|
| `user` | OneToOneField → User | L'utilisateur |
| `has_seen_onboarding` | BooleanField | Tour de bienvenue vu ou non |
| `onboarding_step` | PositiveIntegerField | Étape courante du tour (réservé usage futur) |

### Données initiales (seeds)

Les modules et thèmes sont insérés en base via une **migration Django** (`0002_seed_modules_themes.py`). Il n'y a pas de fixture séparée — les données font partie des migrations. En relançant `migrate` sur une base vierge, les données sont automatiquement présentes.

---

## 6. API — Endpoints disponibles

Toutes les routes sont préfixées `/api/`.

| Méthode | URL | Auth requise | Description |
|---|---|---|---|
| GET | `/api/csrf/` | Non | Pose le cookie CSRF |
| POST | `/api/auth/register/` | Non | Créer un compte |
| POST | `/api/auth/login/` | Non | Connexion (pose les cookies JWT) |
| POST | `/api/auth/refresh/` | Non | Renouvelle l'access token via refresh cookie |
| POST | `/api/auth/logout/` | Non | Supprime les cookies JWT |
| GET | `/api/me/` | Oui | Infos de l'utilisateur connecté |
| GET | `/api/modules/` | Oui | Liste tous les modules avec leurs thèmes |
| POST | `/api/onboarding/complete/` | Oui | Marque l'onboarding comme vu |
| GET | `/api/progress/` | Oui | Toute la progression de l'utilisateur |
| GET | `/api/progress/<theme_id>/` | Oui | Progression sur un thème précis |
| POST | `/api/progress/<theme_id>/` | Oui | Démarre le suivi d'un thème |
| PUT | `/api/progress/<theme_id>/` | Oui | Met à jour la progression (score, complétion) |

L'interface d'admin Django est accessible sur `/admin/`.

---

## 7. Authentification

Le système utilise des **JWT stockés en cookies httpOnly** (non accessibles depuis JavaScript pour se prémunir contre les attaques XSS).

### Flux de connexion

1. Le front récupère d'abord un cookie CSRF via `GET /api/csrf/`
2. Il envoie les identifiants à `POST /api/auth/login/`
3. Django vérifie, génère un **access token** (court) et un **refresh token** (long), et les pose en cookies httpOnly
4. Chaque requête suivante envoie ces cookies automatiquement (grâce à `withCredentials: true` dans Axios)

### Renouvellement automatique

Un intercepteur Axios côté front détecte les réponses `401` avec le code `token_not_valid`. Il appelle alors `POST /api/auth/refresh/` pour obtenir un nouvel access token, puis rejoue la requête échouée. Si le refresh échoue aussi, l'utilisateur est déconnecté.

### Côté Django

Une classe `CookieJWTAuthentication` hérite de `JWTAuthentication` de SimpleJWT. Elle lit le token dans le cookie `access_token` si aucun header `Authorization` n'est présent.

---

## 8. Comment le contenu est chargé

C'est un point important à comprendre : **le contenu pédagogique (leçons et quiz) n'est pas en base de données**. Il est stocké **directement dans le code frontend** sous forme de fichiers TypeScript statiques.

### Organisation

```
frontend/src/nav/
├── cyberLessonData.ts       ← Leçons du module Cybersécurité
├── CyberQuizData.ts         ← Quiz du module Cybersécurité
├── emailLessonData.ts       ← Leçons du module Email
├── EmailQuizData.ts         ← Quiz du module Email
├── bureautiqueLessonData.ts ← Leçons du module Bureautique
├── bureautiqueQuizData.ts   ← Quiz du module Bureautique
├── phishingEmails.ts        ← Données pour le jeu de phishing
└── contentLoaders.ts        ← Fonctions de dispatch par slug
```

### Fonctionnement du chargement

La fonction `getLessonDataByThemeSlug(slug)` dans `contentLoaders.ts` fait la correspondance entre le **slug du thème** (venant de la BDD) et le fichier TypeScript correspondant :

```
slug "passwords"  →  cyberLessonData
slug "phishing"   →  emailLessonData
slug "bases"      →  bureautiqueLessonData
```

Même logique pour les quiz via `getQuizDataByThemeSlug(slug)`.

### Format des leçons

Chaque leçon est un objet avec un `id`, un `title` et un `content` en **HTML/Markdown** (rendu par `react-markdown` avec le plugin `rehype-raw` pour supporter les balises HTML inline).

### Jeux interactifs

Les jeux sont des **composants React** enregistrés dans `frontend/src/config/gameRegistry.ts` :

```
moduleId "bureautique"  →  BureautiqueGameComponent
moduleId "passwords"    →  PasswordGameComponent
moduleId "email"        →  PhishingGameComponent
```

Quand l'utilisateur termine un jeu, le composant appelle `onGameComplete()`, qui déclenche une requête `PUT /api/progress/<theme_id>/` avec `completed: true`.

### Implication pour l'ajout de contenu

Pour **ajouter un nouveau thème** :
1. Créer un `Module` et/ou `Theme` en BDD (via l'admin Django ou une migration)
2. Créer les fichiers `*LessonData.ts` et `*QuizData.ts` correspondants
3. Les référencer dans `contentLoaders.ts`
4. Créer un composant de jeu (optionnel) et le déclarer dans `gameRegistry.ts`

---

## 9. Structure des fichiers

```
DigiPro/
├── docker-compose.yml          ← Dev : DB + backend
├── docker-compose.prod.yml     ← Prod : DB + backend + frontend (Nginx)
├── .env                        ← Variables d'environnement (à créer)
│
├── backend/
│   ├── manage.py
│   ├── requirements.txt
│   ├── config/                 ← Paramètres Django (settings, urls, wsgi)
│   └── api/                    ← Application principale
│       ├── models.py           ← Modèles BDD
│       ├── serializers.py      ← Sérialisation DRF
│       ├── views.py            ← Endpoints auth + progress + me
│       ├── views_modules.py    ← Endpoint modules
│       ├── auth.py             ← CookieJWTAuthentication
│       ├── signals.py          ← Création auto du Profile
│       └── migrations/         ← Migrations + seed initial
│
├── frontend/
│   ├── src/
│   │   ├── api.ts              ← Client Axios + fonctions API
│   │   ├── App.tsx             ← Routeur principal
│   │   ├── auth/               ← AuthContext, ProtectedRoute
│   │   ├── contexts/           ← ModulesProvider, SettingsContext
│   │   ├── pages/              ← Pages (Dashboard, Home, Lesson, Quiz, Game…)
│   │   ├── components/         ← Composants réutilisables
│   │   ├── nav/                ← Contenu statique (leçons, quiz, emails phishing)
│   │   ├── config/             ← gameRegistry
│   │   └── styles/             ← SCSS (thème Dashkit)
│   └── public/
│       ├── fonts/
│       └── gifs/               ← GIFs illustratifs dans les leçons
│
└── infra/
    ├── backend/Dockerfile
    ├── backend/Dockerfile.dev
    └── frontend/Dockerfile
```

---

## 10. Lancer le projet en local

### Prérequis

- Docker Desktop
- Node.js ≥ 22.12 (ou `nvm` pour gérer la version)

### Étapes

```bash
# 1. Copier et compléter le fichier .env (voir section 11)

# 2. Démarrer PostgreSQL + Django
docker compose up -d --build

# 3. Appliquer les migrations (crée les tables + insère les données initiales)
docker compose exec backend python manage.py migrate

# 4. (Optionnel) Créer un superutilisateur pour l'admin Django
docker compose exec backend python manage.py createsuperuser

# 5. Lancer le frontend en développement
cd frontend
npm install
npm run dev
```

| Service | URL |
|---|---|
| Frontend | http://localhost:5173 |
| API Django | http://localhost:8000 |
| Admin Django | http://localhost:8000/admin/ |

---

## 11. Variables d'environnement

Créer un fichier `.env` à la racine du projet :

```env
# Base de données
DB_NAME=DigiPro
DB_USER=admin
DB_PASSWORD=admin
DB_HOST=database
DB_PORT=5432

# Django
DJANGO_DEBUG=1
DJANGO_SECRET_KEY=change-me-in-prod

# CORS (origines autorisées à appeler l'API)
CORS_ALLOWED_ORIGINS=http://localhost:5173
```

> En production, mettre `DJANGO_DEBUG=0` et utiliser une vraie clé secrète aléatoire.

---

## 12. Déploiement en production

Le fichier `docker-compose.prod.yml` est prévu pour la prod. Il attend des **images Docker préalablement buildées et publiées** (ex: sur GitHub Container Registry). Les placeholders `<TON_USER>/<TON_REPO>` dans ce fichier sont à remplacer par les vraies références d'images.

En prod, Nginx sert le build statique React et proxifie `/api/` vers Django.

---

## 13. Points d'attention et pistes d'évolution

### Attention

- **Contenu statique** : les leçons et quiz sont dans le code JS, pas en BDD. Modifier du contenu pédagogique nécessite un redéploiement du frontend.
- **`COOKIE_SECURE = False`** : dans `views.py`, ce flag est à passer à `True` en production (HTTPS obligatoire).
- **`ALLOWED_HOSTS = ["*"]`** : à restreindre au domaine de production dans `settings.py`.
- **Pas de système d'email** : la page "Mot de passe oublié" (`PasswordResetPage`) existe en frontend mais n'a pas de backend associé au moment de la rédaction de ce document.

### Pistes d'évolution

- Déplacer le contenu pédagogique en BDD (table `Lesson`, table `QuizQuestion`) pour permettre l'édition sans redéploiement
- Ajouter de nouveaux modules / thèmes (process décrit en [section 8](#8-comment-le-contenu-est-chargé))
- Implémenter la réinitialisation de mot de passe par email
- Ajouter un panneau d'administration du contenu (CRUD leçons/quiz sans passer par le code)
- Internationalisation (la base `LANGUAGE_CODE = "fr-fr"` est déjà posée)

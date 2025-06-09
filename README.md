# Annuaire de Contacts

Annuaire web pour gérer facilement vos contacts personnels ou professionnels.  
Développé avec Laravel (backend) et React/Inertia.js (frontend).

## Fonctionnalités

- Authentification (inscription, connexion, réinitialisation du mot de passe)
- Création, modification, suppression et visualisation de contacts
- Recherche de contact
- Upload d’avatar pour chaque contact
- Interface utilisateur moderne et responsive (React + Tailwind CSS)
- Validation côté client et serveur

## Installation

1. **Cloner le dépôt**

    ```sh
    git clone <url-du-repo>
    cd contact-directory
    ```

2. **Installer les dépendances**

    ```sh
    composer install
    npm install
    ```

3. **Configurer l’environnement**

    - Copier `.env.example` en `.env` et adapter les variables (DB, mail, etc.)
    - Générer la clé d’application :
        ```sh
        php artisan key:generate
        ```

4. **Migrer la base de données**

    ```sh
    php artisan migrate
    ```

5. **Lancer le serveur**
    ```sh
    php artisan serve
    npm run dev
    ```

## Structure du projet

- **app/** : Contrôleurs, services, requêtes de validation Laravel
- **resources/js/** : Composants React, pages Inertia.js
- **resources/css/** : Styles Tailwind CSS
- **routes/** : Fichiers de routes Laravel

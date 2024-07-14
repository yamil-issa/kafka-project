# Projet : Plateforme de Streaming de Données en Temps Réel avec Apache Kafka, Elasticsearch et Grafana

## Membres du groupe: 
- Yamil Issa

## Description

Ce projet met en œuvre une plateforme de streaming de données en temps réel en utilisant Apache Kafka.

## Prérequis

- Docker et Docker Compose
- Node.js et npm

## Installation

1. Clonez le dépôt :

   git clone https://github.com/yamil-issa/kafka-project.git
   cd kafka-project

2. Installez les dépendances :

   `npm install`


## Lancer les Services Docker

1. Démarrez les services avec Docker Compose :

   `docker-compose up -d`

## Compiler et Exécuter les Producteurs et Consommateurs

1. Compilez le projet :

   `npm run build`

2. Lancez les producteurs :

   - Producteur de données IoT :

     `npm run start:producer:iot`

   - Producteur de journaux d'accès web :

     `npm run start:producer:weblog`

3. Lancez les consommateurs :

   - Consommateur de données IoT :

     `npm run start:consumer:iot`

   - Consommateur de journaux d'accès web :

    `npm run start:consumer:weblog`

## Accéder à Grafana

1. Ouvrez votre navigateur et allez à [http://localhost:3000](http://localhost:3000).
2. Connectez-vous avec les informations d'identification par défaut :
   - **Username**: admin
   - **Password**: admin


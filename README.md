# Webstore Platform Project

This is a fullstack e-commerce platform built to demonstrate web application design and architecture.
It consists of two main applications:

- Webstore (store-) → customer-facing online store
- CRM (crm-) → administration and operations panel (❗️ in progress, currently only initial placeholder code ❗️)

## Key Features

- Backend for Frontend (BFF) architecture with Spring Boot & React
- Authentication & Authorization using OAuth2 + OpenID Connect
- Data persistence with PostgreSQL
- Reverse proxy gateway using Spring Cloud Gateway (for routing and security)
- Frontend with Next.js, shadcn-ui, and TanStack Query (server & client fetching, hydration prefetching)


## Project Structure


| Directory            |             App type             | Description                                                                                                                                                              |
|:---------------------|:--------------------------------:|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| store-frontend/      |             Next.js              | React frontend                                                                                                                                                           |
| store-api/           |           Spring Boot            | Resource Server                                                                                                                                                          |
| store-auth-server/   |           Spring Boot            | Authorization Server                                                                                                                                                     |     
| store-bff/           |           Spring Boot            | BFF Server                                                                                                                                                               |
| store-reverse-proxy/ |           Spring Boot            | Reverse proxy using Spring Cloud Gateway to achieve the same origin for frontend and bff-server → no need for CORS configuration and cookies can be flagged SameSite=Lax |     





## Frontend

- Built with Next.js
- Styled using shadcn/ui + Tailwind CSS
- Data fetching with Next.js server components and TanStack Query


## Backend 


- Reverse proxy using Spring Cloud Gateway (to achieve the same origin for frontend and bff-server → no need for CORS configuration and cookies can be flagged SameSite=Lax)


## What's Next

- store-api (resource-server) migration for Spring Monolith


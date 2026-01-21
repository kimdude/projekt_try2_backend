# DT193G Projekt
## API för hantering av produkter

Detta repo innehåller källkod för ett API som möjliggör lagring av användare och produkter. Grundlänken till API:et är [https://projekt-try2-backend.onrender.com/](https://projekt-try2-backend.onrender.com/).

API:et är anpassat till ett fiktivt företag, Laga Mat, som säljer köksapparater. Det är anslutet till en PostgreSQL-databas som hostas via Render. Databasen lagrar hyllplan, kategorier, produkter och användare. API:et är skapat med Hapi och använder Joi för validering vid anrop. Hapi/Boom används för att skriva ut felmeddelanden med koder, utan att Hapi skriver över dem med default 500-fel. 

För att komma åt API:et måste användare logga in. För autentisering används npm-paketet jsonwebtokens som skapar webtokens, tillsammans med hapi-auth-jwt2 för autentiseringen. Lösernord lagras hashade med Bcrypt. För att logga in används följande URI:

| Metod     | Länk                | Resultat                                    |
|-----------|---------------------|---------------------------------------------|
| POST      | /login              | Logga in                                    |

### Roller
Alla användare måste ha tilldelade roller; __admin__ eller __user__. Som user kan man hantera produkter, kategorier och komma åt sin egna användar-info. Som admin kan utöver det även hantera användare. Det innebär att admin kan läsa ut, skapa nya och ändra roller.

### Router för admin
Följande router är endast tillgängliga för admin.

| Metod     | Länk                  | Resultat                                    |
|-----------|-----------------------|---------------------------------------------|
| GET       | /admin                | Läs ut alla användare                       |
| GET       | /admin/{id}           | Läs ut specifik användare                   |
| POST      | /admin                | Skapa ny användare                          |
| PUT       | /admin/{id}           | Uppdatera roll                              |
| DELETE    | /admin/{id}           | Ta bort användare                           |

För att skapa en ny användare med POST-metoden skickas objekt med följande struktur:
```json
    {
        "role": "admin",
        "fname": "Förnamn",
        "lname": "Efternamn",
        "username": "exempel123",
        "password": "superhemligt"
    }
```

För att uppdatera en användares roll med PUT-metoden skickas endast __role__ i bodyn, samt id som paramenter.

### Router för användare
Följande router kan användas av användaren själv.

| Metod     | Länk                | Resultat                                    |
|-----------|---------------------|---------------------------------------------|
| GET       | /user               | Hämta roll, för-, efter- och användarnamn   |
| PUT       | /user               | Uppdatera lösenord                          |

För att uppdatera lösenord skickas objekt med följande struktur.
```json
    {
        "password": "superhemligt",
        "newPassword": "superDUPERhemligt"
    }
```

### Router för kategorier
Följande router kan användas för att hantera kategorier.

| Metod     | Länk                | Resultat                                    |
|-----------|---------------------|---------------------------------------------|
| GET       | /categories         | Läs ut alla kategorier                      |
| GET       | /categories/{id}    | Läs ut specifik kategori                    |
| POST      | /categories         | Lägg till ny kategori                       |
| PUT       | /categories/{id}    | Uppdatera kategori                          |

För att lägga till eller uppdatera en kategori skickas ett objekt enligt följande struktur.
```json
    {
        "category_name": "Ny kategori"
    }
```

### Router för produkter
Följande router används för hantering av produkter.

| Metod     | Länk                | Resultat                                    |
|-----------|---------------------|---------------------------------------------|
| GET       | /shelves            | Läs ut hyllplan                             |
| GET       | /products           | Läs ut alla produkter                       |
| GET       | /products/{id}      | Läs ut specifik produkt                     |
| POST      | /product            | Lägg till produkt                           |
| PUT       | /products/{id}      | Uppdatera produktinfo                       |
| PUT       | /products/{id}/stock| Uppdatera antal och lagerstatus             |
| DELETE    | /products/{id}      | Ta bort produkt                             |

För att skapa en ny produkt skickas ett objekt med följande struktur:

```json
    {
        "ean_code": "1234567891111",
        "name": "Exempel produkt",
        "label": "Exempel märke",
        "category": "Köksassistenter",
        "description": "Tålig och prisvärd köksmaskin som passar alla.",
        "price": 7399,
        "amount": 15,
        "status": "I lager",
        "shelf_id": 4
    }
```

För att uppdatera en produkt skickas ett liknande objekt, men utan __status__ och __amount__. För att uppdatera lagersaldu på en produkt skickas endast status och amount.

__Kim Dudenhöfer, 18-01-2025__
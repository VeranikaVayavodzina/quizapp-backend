# Quiz Builder Backend

REST API for managing quizzes and blocks built with NestJS and PostgreSQL.

## Tech Stack

**Framework**: NestJS

**Database**: PostgreSQL with TypeORM

**Validation**: class-validator & class-transformer

**Documentation**: Swagger/OpenAPI

## Database Schema

### Quizzes Table

```sql
quizzes (
  id UUID PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  published BOOLEAN DEFAULT false,
  createdAt TIMESTAMP,
  updatedAt TIMESTAMP
)
```

### Blocks Table

```sql
blocks (
  id UUID PRIMARY KEY,
  type VARCHAR(50) NOT NULL,
  order INTEGER NOT NULL,
  properties JSONB NOT NULL,
  quizId UUID REFERENCES quizzes(id) ON DELETE CASCADE
)
```

## Running Locally

### Prerequisites

- Node.js 18+
- PostgreSQL database (or Supabase account)

### Environment Setup

Create `.env` file in project root:

```bash
DATABASE_URL=postgresql://user:password@localhost:5432/quizdb
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=password
DB_NAME=quizdb

# Application
PORT=4000
NODE_ENV=development
```

### For Supabase (recommended for quick setup):

```bash
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres
```

### Installation & Database Setup

```bash
# Install dependencies
npm install

# Database setup (if using Supabase)
# 1. Create account at supabase.com
# 2. Create new project
# 3. Go to SQL Editor
# 4. Run the schema from supabase-blocks-setup.sql

# Start development server
npm run start:dev
```

The API will be available at:

- http://localhost:4000/api (base API)
- http://localhost:4000/docs (Swagger documentation)

### Production Build

```bash
npm run build
npm run start:prod
```

## API Endpoints

### Quiz Management

#### Get All Quizzes

```http
GET /api/quizzes
```

Response:

```json
[
  {
    "id": "550e8400-e29b-41d4-a716-446655440001",
    "title": "Customer Survey",
    "published": true,
    "updatedAt": "2025-09-29T10:00:00Z"
  }
]
```

#### Get Single Quiz

```http
GET /api/quizzes/:id
```

Response includes full quiz with blocks:

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440001",
  "title": "Customer Survey",
  "published": true,
  "createdAt": "2025-09-29T09:00:00Z",
  "updatedAt": "2025-09-29T10:00:00Z",
  "blocks": [
    {
      "id": "b00e8400-e29b-41d4-a716-446655440001",
      "type": "heading",
      "order": 0,
      "properties": { "text": "Welcome", "level": 1 }
    }
  ]
}
```

#### Create Quiz

```http
POST /api/quizzes
Content-Type: application/json

{
  "title": "New Quiz",
  "blocks": [
    {
      "type": "heading",
      "order": 0,
      "properties": {"text": "Quiz Title", "level": 1}
    },
    {
      "type": "question",
      "order": 1,
      "properties": {
        "text": "Sample question?",
        "questionType": "single",
        "options": ["Option A", "Option B"]
      }
    }
  ]
}
```

#### Update Quiz

```http
PUT /api/quizzes/:id
Content-Type: application/json

{
  "title": "Updated Title",
  "blocks": [...]  // Full blocks array - replaces existing
}
```

#### Publish Quiz

```http
POST /api/quizzes/:id/publish
```

#### Delete Quiz

```http
DELETE /api/quizzes/:id
```

## Known Limitations & Trade-offs

### Current Issues

- Block updates replace the entire blocks array (not optimal for large quizzes)
- No soft deletes - quiz deletion is permanent
- No pagination on quiz list (could be slow with many quizzes)

### Security Considerations

- No authentication/authorization implemented
- All endpoints are public
- No rate limiting
- Input validation is basic

### Performance Notes

- TypeORM synchronize=true in development (don't use in production)
- Eager loading blocks on quiz fetch (could be optimized)
- No database indexing beyond primary/foreign keys
- No caching layer

### Scalability Concerns

- Single database instance

## Error Handling

Standard HTTP status codes:

- 200: Success
- 201: Created
- 400: Bad Request (validation errors)
- 404: Not Found
- 500: Internal Server Error

Error responses include descriptive messages:

```json
{
  "statusCode": 400,
  "message": ["title should not be empty"],
  "error": "Bad Request"
}
```

## Development Notes

The block properties are stored as JSONB which provides flexibility but makes validation tricky. Each block type has different property requirements that are validated at the DTO level.

TypeORM relationships are configured with cascade operations, so deleting a quiz automatically removes all associated blocks.

The seeder runs on application startup and only seeds if the database is empty. This prevents duplicate data but means you need to manually clear the database to re-seed.

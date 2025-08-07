# Journaling Mobile App Backend

## Overview
A scalable NestJS backend for a trading journal mobile app. Features include secure user authentication, strategy management, trade journaling, media uploads (images, videos, audio), and analytics endpoints. Designed for seamless integration with an Expo React Native frontend.

## Technologies Used
- **NestJS**: Modular Node.js framework
- **PostgreSQL**: Relational database
- **TypeORM**: ORM for database management
- **Passport + JWT**: Authentication
- **Cloudinary**: Media storage (images, videos, audio)
- **Multer**: File upload middleware
- **FFmpeg**: Audio encoding/processing
- **Swagger**: API documentation
- **@nestjs/config**: Environment variable management

## Folder Structure
```
src/
├── auth/          # Authentication (JWT, strategies)
├── users/         # User management, preferences
├── strategies/    # Trading strategies, confirmation steps
├── journals/      # Trade journal entries, confirmation responses
├── media/         # Media upload and processing
├── analytics/     # Dashboard analytics endpoints
├── config/        # Cloudinary and other configs
├── common/        # Guards, decorators, interceptors, filters
├── app.module.ts
└── main.ts
```

## API Endpoints

### Authentication
- `POST /auth/signup` — Register a new user
- `POST /auth/login` — Login and receive JWT

### User Management
- `GET /users/me` — Get current user info
- `PUT /users/preferences` — Update user preferences (notifications, language, etc.)

### Strategy Management
- `POST /strategies` — Create a strategy
- `GET /strategies` — List user strategies
- `GET /strategies/:id` — Get strategy details
- `PUT /strategies/:id` — Update a strategy
- `DELETE /strategies/:id` — Delete a strategy
- `POST /strategies/confirmation-steps` — Add confirmation steps to a strategy

### Trade Journal
- `POST /journals` — Create journal entry
- `GET /journals` — List user journal entries
- `GET /journals/:id` — Get journal entry details
- `PUT /journals/:id` — Update journal entry
- `POST /journals/confirmation` — Add confirmation responses to a journal entry
- `PUT /journals/confirmation/:id` — Update confirmation response

### Analytics
- `GET /analytics/summary` — Dashboard summary
- `GET /analytics/by-strategy` — Strategy performance
- `GET /analytics/win-loss-ratio` — Win/loss analytics

## Database Schema

- **User**: `id`, `email`, `password`, `theme`, `preferences`
- **Strategy**: `id`, `userId`, `name`, `description`
- **ConfirmationStep**: `id`, `strategyId`, `title`, `description`
- **JournalEntry**: `id`, `userId`, `strategyId`, `entryLevel`, `exitLevel`, `startingBalance`, `closingBalance`, `signalType`, `notes`
- **Media**: `id`, `userId`, `journalId`, `type`, `url`
- **ConfirmationResponse**: `id`, `journalId`, `stepId`, `followed`, `notes`

## Integration with Expo App

The backend exposes a RESTful API for the Expo React Native frontend. The app uses these endpoints for:
- User authentication and settings
- Strategy creation and management
- Logging trades and uploading media
- Viewing analytics dashboards

Authentication is handled via JWT tokens. Media uploads are processed and stored in Cloudinary. Audio files are encoded using FFmpeg before upload.

## Getting Started

1. **Clone the repository**
   ```
   git clone <repo-url>
   cd journaling-app-backend
   ```

2. **Install dependencies**
   ```
   npm install
   ```

3. **Configure environment variables**
   - Create a `.env` file:
     ```
     JWT_SECRET=your_super_secret_jwt_key
     ```
   - Configure database in `ormconfig.json`
   - Set Cloudinary credentials in `src/config/cloudinary.config.ts`

4. **Run the application**
   ```
   npm run start
   ```

## License
This project is licensed under the MIT License.
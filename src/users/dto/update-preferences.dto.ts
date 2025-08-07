import { IsEnum } from 'class-validator';

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
}

export class UpdatePreferencesDto {
  @IsEnum(Theme)
  theme: Theme;
  notificationsEnabled?: boolean;
  language?: string;
}
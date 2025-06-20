export interface BusinessInfo {
  companyName: string;
  industry: Industry;
  description: string;
  targetAudience: TargetAudience;
  services: Service[];
  contact: ContactInfo;
  socialMedia: SocialMedia;
  branding: BrandingInfo;
  location: Location;
}

export interface Industry {
  category: string;
  subCategory: string;
  keywords: string[];
}

export interface TargetAudience {
  demographics: Demographics;
  psychographics: Psychographics;
  behaviors: string[];
}

export interface Demographics {
  ageRange: [number, number];
  gender: Gender[];
  income: IncomeLevel;
  education: EducationLevel[];
  location: string[];
}

export interface Psychographics {
  interests: string[];
  values: string[];
  lifestyle: string[];
  challenges: string[];
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price?: Price;
  features: string[];
  category: string;
}

export interface Price {
  amount: number;
  currency: string;
  period?: PricingPeriod;
}

export interface ContactInfo {
  email: string;
  phone: string;
  address: Address;
  hours: BusinessHours;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface BusinessHours {
  [key: string]: HoursRange;
}

export interface HoursRange {
  open: string;
  close: string;
  closed?: boolean;
}

export interface SocialMedia {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  linkedin?: string;
  youtube?: string;
  tiktok?: string;
  [key: string]: string | undefined;
}

export interface BrandingInfo {
  logo?: string;
  favicon?: string;
  colors: BrandColors;
  tagline?: string;
  mission?: string;
  vision?: string;
  values: string[];
}

export interface BrandColors {
  primary: string;
  secondary?: string;
  accent?: string;
}

export interface Location {
  coordinates?: {
    lat: number;
    lng: number;
  };
  serviceArea?: string[];
  isOnline: boolean;
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
  ALL = 'all'
}

export enum IncomeLevel {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  VERY_HIGH = 'very_high'
}

export enum EducationLevel {
  HIGH_SCHOOL = 'high_school',
  SOME_COLLEGE = 'some_college',
  BACHELORS = 'bachelors',
  MASTERS = 'masters',
  DOCTORATE = 'doctorate'
}

export enum PricingPeriod {
  HOUR = 'hour',
  DAY = 'day',
  WEEK = 'week',
  MONTH = 'month',
  YEAR = 'year',
  ONE_TIME = 'one_time'
}
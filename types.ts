
export enum UserRole {
  PATIENT = 'PATIENT',
}

export interface User {
  id: string;
  name: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  pairedDeviceID?: string;
}

export interface SeizureLog {
  id: string;
  timestamp: string;
  duration: string;
  severity: 'Mild' | 'Moderate' | 'Severe';
  notes?: string;
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  diagnoses: string[];
  medications: { name: string; dosage: string; frequency: string }[];
  scans: { type: string; url: string; date: string }[];
}

export interface DeviceStats {
  heartRate: number;
  spo2: number; // Oxygen saturation
  battery: number;
  status: 'Connected' | 'Disconnected' | 'Syncing';
}

export interface Alert {
  id: string;
  type: 'PREDICTION' | 'EMERGENCY' | 'MEDICATION';
  message: string;
  timestamp: string;
  active: boolean;
  countdown?: number;
}

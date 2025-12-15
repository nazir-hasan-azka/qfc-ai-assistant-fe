// Application Types
export type ApplicationStatus = 'draft' | 'submitted' | 'under_review' | 'approved' | 'rejected' | 'withdrawn';
export type LegalStructure = 'llc' | 'llc_branch' | 'llc_g' | 'llp' | 'llp_branch' | 'foundation';
export type ConnectionToFirm = 'proposed_shareholder' | 'proposed_director' | 'proposed_secretary' | 'agent';
export type FundingSource = 'self_funded' | 'third_party' | 'other';
export type Currency = 'qar' | 'usd' | 'euro' | 'gbp';
export type IndividualTitle = 'mr' | 'mrs' | 'ms' | 'dr';
export type ShareholderEntityType = 'individual' | 'corporate_body';
export type DirectorAuthorityLevel = 'no_power' | 'full_power_and_authority' | 'authority_for_bank_transactions';
export type OfficeType = 'business_centre' | 'stand_alone_office';

export interface FileUpload {
  id: string;
  file: string;
  is_deleted: boolean;
}

export interface AgentDetails {
  id: string;
  agent_first_name: string;
  agent_last_name: string;
  agent_passport_number: string;
  is_qatar_resident: boolean;
}

export interface Activity {
  id: string;
  activity_name: string;
  activity_code: string;
}

export interface ShareClass {
  id: string;
  class_type: string;
  number_of_shares: number;
  nominal_value: string;
  currency: Currency;
}

export interface PrequalificationApplication {
  id: string;
  legal_structure: LegalStructure;
  proposed_activities_description: string;
  proposed_name_english?: string;
}

export interface ApiResponse<T = unknown> {
  data?: T;
  message?: string;
  error?: string;
}

export type MessageRole = 'user' | 'assistant' | 'system';

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
  metadata?: Record<string, unknown>;
}

export interface ExtractedCompanyData {
  company_name?: string;
  registration_number?: string;
  legal_entity_type?: LegalStructure;
  confidence_score?: number;
}

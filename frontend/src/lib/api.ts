import axios from "axios";

const API_BASE_URL = "http://localhost:8000";

export type UserRole = "INSTITUTION" | "SCRUTINY_OFFICER" | "AICTE_OFFICIAL" | "SYSTEM_ADMIN";

export async function fetchSystemState() {
  const res = await axios.get(`${API_BASE_URL}/ps4/state`);
  return res.data;
}

export async function createApplication(payload: {
  institution_name: string;
  region: string;
  app_type: string;
  academic_year: string;
  checklist: string[];
  save_as_draft: boolean;
  actor_name: string;
}) {
  const res = await axios.post(`${API_BASE_URL}/ps4/applications`, payload);
  return res.data;
}

export async function performWorkflowAction(payload: {
  app_id: string;
  action_type: "ADVANCE" | "RETURN_DEFICIENCY" | "RESUBMIT_CLARIFICATION";
  observation: string;
  actor_name: string;
  actor_role: UserRole;
}) {
  const res = await axios.post(`${API_BASE_URL}/ps4/workflow-action`, payload);
  return res.data;
}

export async function updateEVCSchedule(payload: {
  evc_id: string;
  visit_date: string;
  committee_members: string;
  status: string;
  observations: string;
  actor_name: string;
  actor_role: UserRole;
}) {
  const res = await axios.post(`${API_BASE_URL}/ps4/evc-schedule`, payload);
  return res.data;
}

export async function updateUndertaking(payload: {
  undertaking_id: string;
  action: "SUBMIT_EVIDENCE" | "VERIFY" | "ESCALATE";
  evidence_or_note: string;
  actor_name: string;
  actor_role: UserRole;
}) {
  const res = await axios.post(`${API_BASE_URL}/ps4/undertakings`, payload);
  return res.data;
}

export async function updateLeaseDoc(payload: {
  doc_id: string;
  action: "SUBMIT_RENEWAL" | "VERIFY_RENEWAL";
  renewal_evidence: string;
  new_expiry_date?: string;
  actor_name: string;
  actor_role: UserRole;
}) {
  const res = await axios.post(`${API_BASE_URL}/ps4/leases`, payload);
  return res.data;
}

export async function triggerSLACheck() {
  const res = await axios.post(`${API_BASE_URL}/ps4/trigger-sla-check`);
  return res.data;
}

export async function runSuperAudit(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  const res = await axios.post(`${API_BASE_URL}/super-audit`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

export async function sendHelpDeskQuery(message: string): Promise<string> {
  const res = await axios.post(`${API_BASE_URL}/help-desk`, { message });
  return res.data.reply;
}

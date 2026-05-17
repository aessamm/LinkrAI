export const LINK_PROCESSING_QUEUE = "link-processing.queue";
export const PROCESS_SAVED_ITEM_JOB = "process-saved-item";

export interface LinkProcessingJobData {
  savedItemId: string;
  userId: string;
}

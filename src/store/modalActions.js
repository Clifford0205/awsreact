export const SHOW_MODAL = "SHOW_MODAL";
export const CLOSE_MODAL = "CLOSE_MODAL";

export function showModal (config) {
  return {
    type: SHOW_MODAL,
    bodyText: config.bodyText,
    buttonText: config.buttonText,
    noBtn: config.noBtn,
    noCBtn: config.noCBtn,
    backdrop: config.backdrop,
    confirm: config.confirm
  }
}

export function closeModal () {
  return {
    type: CLOSE_MODAL
  }
}


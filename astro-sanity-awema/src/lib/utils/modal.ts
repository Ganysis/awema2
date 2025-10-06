function showModal(modalElement: HTMLElement, src: string | null): void {
  const iframe: HTMLIFrameElement = modalElement.querySelector("iframe")!;
  if (src) {
    iframe.src = src;
  }
  modalElement.classList.add("active");

  function closeModal(e: Event): void {
    const targetElement = e.target as HTMLElement;
    const isInsideModal: boolean = !!targetElement.closest(".modal-body");
    const isModalOpenButton: boolean =
      targetElement.hasAttribute("data-target");

    if (!isModalOpenButton && !isInsideModal) {
      if (src) {
        iframe.src = "";
      }
      modalElement.classList.remove("active");
      document.body.style.paddingInline = "";
      document.body.classList.remove("overflow-hidden");
      window.removeEventListener("click", closeModal);
    }
  }

  window.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      if (src) {
        iframe.src = "";
      }
      modalElement.classList.remove("active");
      document.body.style.paddingInline = "";
      document.body.classList.remove("overflow-hidden");
      window.removeEventListener("click", closeModal);
    }
  });

  window.addEventListener("click", closeModal);
}

export function modal(): void {
  const modalButtons: NodeListOf<HTMLElement> =
    document.querySelectorAll("[data-modal]");
  modalButtons.forEach((button) => {
    button.addEventListener("click", function (e: Event) {
      e.preventDefault(); // Prevents the default behavior of anchor/button click
      const target: string | null = this.getAttribute("data-target");
      const src: string | null = this.getAttribute("data-src");
      const modalElement: HTMLElement | null = document.querySelector(
        "#" + target!,
      );

      const modalClose = modalElement?.querySelector("[modal-close]");

      modalClose?.addEventListener("click", function () {
        if (!modalElement) return;
        modalElement.classList.remove("active");
        document.body.style.paddingInline = "";
        document.body.classList.remove("overflow-hidden");
      });
      if (modalElement) {
        const scrollWidth: number =
          window.innerWidth - document.documentElement.clientWidth;
        document.body.style.paddingInline = scrollWidth + "px";
        document.body.classList.add("overflow-hidden");
        showModal(modalElement, src);
      }
    });
  });
}

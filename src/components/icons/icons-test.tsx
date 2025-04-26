export default function IconsTest() {
  return (
    <div
      className="flex flex-col gap-4 self-stretch py-6"
      data-testid="ShareModal-ShareList">
      <div className="relative">
        <div
          className="flex items-start gap-4 overflow-auto pl-4 webkit-scrollbar:w-0 webkit-scrollbar:bg-transparent"
          style={{ paddingRight: "40px" }}>
          <div className="flex w-[60px]">
            <button
              className="flex w-[60px] flex-col items-center justify-center gap-2 px-[3px] outline-none focus-visible:ring-1 focus-visible:ring-black"
              type="button"
              data-testid="ShareModal-ShareLink">
              <div className="bg-neutral-200 relative flex h-12 w-12 items-center justify-center rounded-[320px]">
                <svg
                  viewBox="0 0 48 48"
                  className="h-12 w-12"
                  data-testid="ShareIcon-copyLinktree"
                  //   shape="circle"
                >
                  <circle cx="50%" cy="50%" r="50%" fill="#E0E2D9"></circle>
                  <path d="m23.863 18.214-.422.489-.757-.654.434-.503.025-.027a5.19 5.19 0 1 1 7.337 7.34l-.025.023-.5.435-.657-.755.487-.423a4.19 4.19 0 0 0-5.922-5.925m3.654 2.975-.354.354-5.626 5.626-.353.353-.708-.707.354-.353 5.626-5.627.354-.353zm-8.81 2.25-.481.425a4.16 4.16 0 0 0 .01 5.91 4.25 4.25 0 0 0 5.953.026l.349-.47.802.597-.372.5-.05.058a5.25 5.25 0 0 1-7.385 0 5.16 5.16 0 0 1 0-7.342l.02-.02.491-.433z"></path>
                </svg>
              </div>
              <div className="whitespace-nowrap text-center text-xs">
                Copy Linktree
              </div>
            </button>
          </div>
          <div className="flex w-[60px]">
            <a
              className="flex w-[60px] flex-col items-center justify-center gap-2 px-[3px] outline-none focus-visible:ring-1 focus-visible:ring-black"
              target="_blank"
              href="https://x.com/intent/tweet?text=Check%20out%20this%20Linktree! - https://linktr.ee/daiveed?utm_source=linktree_profile_share&amp;ltsid=99be4b27-5f3c-4147-bc85-da393c5fee6c"
              data-testid="ShareModal-ShareLink">
              <div className="bg-neutral-200 relative flex h-12 w-12 items-center justify-center rounded-[320px]">
                <svg
                  viewBox="0 0 48 48"
                  className="h-12 w-12"
                  data-testid="ShareIcon-x"
                  //   shape="circle"
                >
                  <circle cx="50%" cy="50%" r="50%" fill="black"></circle>
                  <path
                    d="M11.559 12.251L20.825 25.1736L11.5 35.6775H13.6L21.763 26.4794L28.359 35.6786H35.5L25.712 22.029L34.392 12.25H32.293L24.775 20.7211L18.7 12.251H11.559ZM14.645 13.8625H17.925L32.413 34.0661H29.133L14.644 13.8635L14.645 13.8625Z"
                    fill="white"></path>
                </svg>
              </div>
              <div className="whitespace-nowrap text-center text-xs">X</div>
            </a>
          </div>
          <div className="flex w-[60px]">
            <a
              className="flex w-[60px] flex-col items-center justify-center gap-2 px-[3px] outline-none focus-visible:ring-1 focus-visible:ring-black"
              target="_blank"
              href="https://www.facebook.com/sharer.php?u=https://linktr.ee/daiveed?utm_source=linktree_profile_share&amp;ltsid=99be4b27-5f3c-4147-bc85-da393c5fee6c"
              data-testid="ShareModal-ShareLink">
              <div className="bg-neutral-200 relative flex h-12 w-12 items-center justify-center rounded-[320px]">
                <svg
                  viewBox="0 0 24 24"
                  className="h-12 w-12"
                  data-testid="ShareIcon-facebook"
                  // shape="circle"
                >
                  <circle cx="50%" cy="50%" r="50%" fill="#1877F2"></circle>
                  <path
                    d="M18 12a6 6 0 1 0-12 0 6 6 0 0 0 5.063 5.928v-4.193H9.539V12h1.524v-1.322c0-1.503.895-2.334 2.266-2.334.656 0 1.343.117 1.343.117v1.477h-.757c-.745 0-.977.463-.977.937V12h1.664l-.267 1.735h-1.398v4.193A6 6 0 0 0 18 12"
                    fill="#fff"></path>
                </svg>
              </div>
              <div className="whitespace-nowrap text-center text-xs">
                Facebook
              </div>
            </a>
          </div>
          <div className="flex w-[60px]">
            <a
              className="flex w-[60px] flex-col items-center justify-center gap-2 px-[3px] outline-none focus-visible:ring-1 focus-visible:ring-black"
              target="_blank"
              href="https://wa.me/?text=Check%20out%20this%20Linktree! - https://linktr.ee/daiveed?utm_source=linktree_profile_share&amp;ltsid=99be4b27-5f3c-4147-bc85-da393c5fee6c"
              data-testid="ShareModal-ShareLink">
              <div className="bg-neutral-200 relative flex h-12 w-12 items-center justify-center rounded-[320px]">
                <svg
                  viewBox="0 0 24 24"
                  className="h-12 w-12"
                  data-testid="ShareIcon-whatsapp"
                  // shape="circle"
                >
                  <circle cx="50%" cy="50%" r="50%" fill="#00E676"></circle>
                  <path
                    d="M16.201 7.746a5.9 5.9 0 0 0-4.205-1.745c-3.276 0-5.945 2.669-5.948 5.945 0 1.049.274 2.07.793 2.973L6 18.001l3.153-.826a5.95 5.95 0 0 0 2.843.724h.003c3.275 0 5.944-2.669 5.947-5.948A5.92 5.92 0 0 0 16.2 7.746m-4.205 9.146c-.89 0-1.76-.24-2.518-.69l-.18-.108-1.87.49.5-1.824-.118-.188a4.9 4.9 0 0 1-.755-2.63 4.95 4.95 0 0 1 4.944-4.937c1.32 0 2.56.516 3.495 1.448a4.92 4.92 0 0 1 1.445 3.496 4.95 4.95 0 0 1-4.943 4.943m2.711-3.7a27 27 0 0 0-1.015-.485c-.137-.049-.236-.074-.334.074-.1.148-.384.485-.47.582-.085.1-.174.11-.322.037s-.627-.231-1.195-.739a4.5 4.5 0 0 1-.827-1.029c-.085-.148-.008-.228.066-.302.066-.066.148-.174.223-.26.074-.085.1-.148.148-.248s.025-.185-.012-.259-.333-.807-.459-1.103c-.12-.291-.242-.251-.333-.254C10.09 9.2 9.99 9.2 9.892 9.2c-.1 0-.26.037-.397.185-.136.149-.519.508-.519 1.24 0 .733.534 1.438.608 1.537.074.1 1.046 1.6 2.537 2.244.354.154.63.245.847.314.356.114.678.097.935.06.285-.043.878-.36 1.004-.707.122-.348.122-.645.085-.707-.037-.063-.137-.1-.285-.174"
                    fill="#fff"></path>
                </svg>
              </div>
              <div className="whitespace-nowrap text-center text-xs">
                WhatsApp
              </div>
            </a>
          </div>
          <div className="flex w-[60px]">
            <a
              className="flex w-[60px] flex-col items-center justify-center gap-2 px-[3px] outline-none focus-visible:ring-1 focus-visible:ring-black"
              target="_blank"
              href="https://www.linkedin.com/sharing/share-offsite/?url=https://linktr.ee/daiveed?utm_source=linktree_profile_share&amp;ltsid=99be4b27-5f3c-4147-bc85-da393c5fee6c"
              data-testid="ShareModal-ShareLink">
              <div className="bg-neutral-200 relative flex h-12 w-12 items-center justify-center rounded-[320px]">
                <svg
                  viewBox="0 0 24 24"
                  className="h-12 w-12"
                  data-testid="ShareIcon-linkedin"
                  // shape="circle"
                >
                  <circle cx="50%" cy="50%" r="50%" fill="#0A66C2"></circle>
                  <path
                    d="M8.656 10.132h-2.46V18h2.46zm.221-2.705A1.417 1.417 0 0 0 7.47 6h-.044a1.426 1.426 0 0 0 0 2.852A1.416 1.416 0 0 0 8.877 7.47zM18 13.22c0-2.365-1.505-3.285-3-3.285a2.8 2.8 0 0 0-2.488 1.269h-.07v-1.072h-2.31V18h2.458v-4.186a1.633 1.633 0 0 1 1.476-1.76h.093c.782 0 1.362.492 1.362 1.731V18h2.46z"
                    fill="#fff"></path>
                </svg>
              </div>
              <div className="whitespace-nowrap text-center text-xs">
                LinkedIn
              </div>
            </a>
          </div>
          <div className="flex w-[60px]">
            <a
              className="flex w-[60px] flex-col items-center justify-center gap-2 px-[3px] outline-none focus-visible:ring-1 focus-visible:ring-black"
              target="_blank"
              href="https://www.messenger.com/new"
              data-testid="ShareModal-ShareLink">
              <div className="bg-neutral-200 relative flex h-12 w-12 items-center justify-center rounded-[320px]">
                <svg
                  viewBox="0 0 24 24"
                  className="h-12 w-12"
                  data-testid="ShareIcon-messenger"
                  // shape="circle"
                >
                  <circle cx="50%" cy="50%" r="50%" fill="#F1F1F1"></circle>
                  <path
                    d="M12 6.002c-3.38 0-6 2.476-6 5.82 0 1.75.717 3.26 1.884 4.305a.48.48 0 0 1 .162.342l.032 1.067a.48.48 0 0 0 .674.424l1.19-.525a.48.48 0 0 1 .321-.024c.547.15 1.13.23 1.737.23 3.38 0 6-2.475 6-5.82 0-3.343-2.62-5.82-6-5.82"
                    fill="url(#paint0_radial_657_559)"></path>
                  <path
                    d="m8.397 13.524 1.762-2.796a.9.9 0 0 1 1.302-.24l1.402 1.05a.36.36 0 0 0 .433 0L15.19 10.1c.252-.192.582.11.413.379l-1.763 2.796a.9.9 0 0 1-1.301.24l-1.402-1.051a.36.36 0 0 0-.434.001L8.81 13.903c-.252.191-.582-.11-.413-.38"
                    fill="#fff"></path>
                  <defs>
                    <radialGradient
                      id="paint0_radial_657_559"
                      cx="0"
                      cy="0"
                      r="1"
                      gradientUnits="userSpaceOnUse"
                      gradientTransform="translate(8.3 17.9) scale(13 13)">
                      <stop stop-color="#0099FF"></stop>
                      <stop offset="0.6" stop-color="#A033FF"></stop>
                      <stop offset="0.93" stop-color="#FF5280"></stop>
                      <stop offset="1" stop-color="#FF7061"></stop>
                    </radialGradient>
                  </defs>
                </svg>
              </div>
              <div className="whitespace-nowrap text-center text-xs">
                Messenger
              </div>
            </a>
          </div>
          <div className="flex w-[60px]">
            <a
              className="flex w-[60px] flex-col items-center justify-center gap-2 px-[3px] outline-none focus-visible:ring-1 focus-visible:ring-black snapchat-share-button"
              target="_blank"
              href="snapchat://creativeKitWeb/camera/1?attachmentUrl=https://linktr.ee/daiveed"
              data-testid="ShareModal-ShareLink"
              data-share-url="https://linktr.ee/daiveed">
              <div className="bg-neutral-200 relative flex h-12 w-12 items-center justify-center rounded-[320px]">
                <svg
                  viewBox="0 0 24 24"
                  className="h-12 w-12"
                  data-testid="ShareIcon-snapchat"
                  // shape="circle"
                >
                  <circle cx="50%" cy="50%" r="50%" fill="#FFFC00"></circle>
                  <path
                    fill="#fff"
                    d="M18.78 15.392c-.058-.193-.337-.329-.337-.329l-.07-.036a5.4 5.4 0 0 1-1.224-.802 4.2 4.2 0 0 1-.71-.809 3 3 0 0 1-.391-.806c-.026-.104-.022-.146 0-.2a.3.3 0 0 1 .097-.11c.157-.111.41-.275.565-.375.135-.087.25-.162.318-.21.218-.152.368-.308.456-.476a.82.82 0 0 0 .039-.69c-.12-.317-.416-.505-.792-.505q-.126 0-.255.027c-.216.047-.42.124-.59.19a.018.018 0 0 1-.026-.018c.019-.423.04-.992-.008-1.533a3.8 3.8 0 0 0-.307-1.26 3.4 3.4 0 0 0-.548-.821 3.4 3.4 0 0 0-.867-.697 4 4 0 0 0-2.022-.515 4 4 0 0 0-2.02.515c-.45.257-.737.547-.868.697-.168.193-.383.46-.548.82s-.266.771-.307 1.261a12 12 0 0 0-.009 1.533c0 .014-.012.024-.026.018a4 4 0 0 0-.59-.19 1.2 1.2 0 0 0-.256-.027c-.375 0-.67.188-.791.505a.82.82 0 0 0 .039.69c.089.168.237.324.455.476.067.048.183.123.318.21.151.099.397.258.556.368a.3.3 0 0 1 .106.117c.023.055.027.097-.002.208a3 3 0 0 1-.39.798c-.19.29-.43.561-.709.809-.347.306-.76.577-1.224.802l-.077.04s-.278.142-.33.325c-.078.271.129.525.339.661.344.223.763.342 1.006.407q.102.027.185.052a.4.4 0 0 1 .16.093c.047.06.052.136.07.22.025.143.085.32.262.442.194.133.44.143.752.156.326.012.732.027 1.197.182.215.07.411.191.636.33.472.29 1.06.651 2.062.651 1.004 0 1.596-.362 2.07-.654.226-.137.419-.257.63-.326.465-.154.87-.17 1.197-.182.312-.012.558-.02.752-.156.19-.13.243-.325.268-.47.014-.072.023-.138.064-.19a.36.36 0 0 1 .154-.09q.085-.027.192-.055c.243-.065.548-.142.92-.351.446-.254.477-.565.43-.72Z"></path>
                  <path
                    fill="#000"
                    d="M19.168 15.242c-.1-.269-.288-.412-.502-.531a1 1 0 0 0-.108-.057l-.195-.099c-.667-.354-1.19-.801-1.55-1.33a3 3 0 0 1-.267-.472c-.03-.09-.03-.14-.007-.185a.3.3 0 0 1 .086-.089c.115-.076.233-.153.314-.204.143-.093.257-.167.329-.217.275-.191.466-.395.586-.623.17-.32.19-.688.06-1.032-.18-.478-.634-.775-1.18-.775q-.173 0-.344.038l-.089.02a10 10 0 0 0-.031-1.01c-.103-1.195-.521-1.82-.957-2.32a3.8 3.8 0 0 0-.974-.784A4.4 4.4 0 0 0 12.11 5c-.815 0-1.565.192-2.227.57a3.8 3.8 0 0 0-.975.785c-.436.499-.854 1.125-.957 2.32-.029.338-.036.685-.032 1.01l-.089-.02a1.6 1.6 0 0 0-.343-.038c-.547 0-1 .297-1.18.775-.13.344-.11.71.06 1.031.12.228.312.432.586.624.073.051.186.125.329.217.078.05.19.123.301.197a.3.3 0 0 1 .098.097c.023.047.023.098-.012.193-.058.13-.143.287-.262.462-.354.518-.861.957-1.507 1.307-.343.182-.698.303-.848.711-.114.308-.039.66.248.955q.14.152.364.275c.353.195.653.29.889.356a.6.6 0 0 1 .18.08c.105.092.09.23.23.434.084.126.182.212.262.268.293.202.624.215.973.229.316.012.674.026 1.082.16.17.056.346.165.549.29.489.301 1.16.712 2.28.712 1.122 0 1.795-.414 2.288-.715.203-.124.378-.232.542-.286.408-.135.766-.149 1.082-.161.35-.014.678-.027.973-.23.092-.063.208-.167.3-.326.1-.17.099-.291.193-.373a.6.6 0 0 1 .17-.077 4 4 0 0 0 .9-.36c.16-.087.284-.183.382-.292l.005-.004c.267-.292.336-.632.224-.934m-.996.535c-.608.336-1.012.3-1.326.501-.267.173-.11.543-.303.677-.239.165-.943-.011-1.852.288-.75.249-1.23.961-2.58.961-1.354 0-1.82-.71-2.58-.96-.91-.3-1.615-.124-1.853-.29-.193-.133-.036-.503-.303-.676-.313-.202-.718-.166-1.326-.501-.387-.214-.168-.346-.039-.408 2.203-1.065 2.553-2.712 2.57-2.836.019-.147.04-.264-.123-.415-.157-.146-.855-.578-1.048-.712-.321-.224-.461-.447-.357-.722.072-.19.25-.261.437-.261q.089 0 .175.019c.352.076.693.253.89.3q.042.01.073.01c.105 0 .141-.053.134-.174-.022-.385-.078-1.134-.016-1.836.083-.963.394-1.441.763-1.865.178-.202 1.011-1.083 2.604-1.083 1.597 0 2.426.88 2.604 1.083.369.423.68.9.763 1.865.061.702.009 1.451-.016 1.836-.009.126.03.174.134.174a.3.3 0 0 0 .073-.01c.197-.047.538-.224.89-.3a1 1 0 0 1 .175-.02c.187 0 .365.073.437.262.104.275-.037.498-.357.722-.193.134-.891.566-1.048.712-.163.15-.142.267-.122.415.015.124.366 1.77 2.569 2.836.125.062.345.194-.042.408"></path>
                </svg>
              </div>
              <div className="whitespace-nowrap text-center text-xs">
                Snapchat
              </div>
            </a>
          </div>
          <div className="flex w-[60px]">
            <a
              className="flex w-[60px] flex-col items-center justify-center gap-2 px-[3px] outline-none focus-visible:ring-1 focus-visible:ring-black"
              target="_blank"
              href="mailto:?subject= Check out this Linktree! &amp;body= Check%20out%20this%20Linktree! - https://linktr.ee/daiveed?utm_source=linktree_profile_share&amp;ltsid=99be4b27-5f3c-4147-bc85-da393c5fee6c"
              data-testid="ShareModal-ShareLink">
              <div className="bg-neutral-200 relative flex h-12 w-12 items-center justify-center rounded-[320px]">
                <svg
                  viewBox="0 0 48 48"
                  className="h-12 w-12"
                  data-testid="ShareIcon-email"
                  // shape="circle"
                >
                  <circle cx="50%" cy="50%" r="50%" fill="#60696C"></circle>
                  <path
                    d="M24.154 26.568a.5.5 0 0 0 .692 0l1.416-1.354 5.192 4.976a.5.5 0 0 0 .692-.722l-5.16-4.946 5.228-4.997a.5.5 0 0 0-.691-.723l-5.582 5.336-.048.045-1.393 1.332-1.386-1.325-.062-.059-5.575-5.329a.5.5 0 1 0-.691.723l5.229 4.998-5.162 4.947a.5.5 0 1 0 .695.721l5.19-4.976z"
                    fill="#fff"></path>
                  <path
                    d="M35 29.318a3.683 3.683 0 0 1-3.679 3.68H17.679A3.683 3.683 0 0 1 14 29.317v-9.642a3.683 3.683 0 0 1 3.679-3.679h13.642A3.683 3.683 0 0 1 35 19.677zm-17.321-12.32A2.68 2.68 0 0 0 15 19.675v9.642a2.68 2.68 0 0 0 2.679 2.68h13.642A2.68 2.68 0 0 0 34 29.317v-9.642a2.68 2.68 0 0 0-2.679-2.679z"
                    fill="#fff"></path>
                </svg>
              </div>
              <div className="whitespace-nowrap text-center text-xs">Email</div>
            </a>
          </div>
          <div className="flex w-[60px]">
            <button
              className="flex w-[60px] flex-col items-center justify-center gap-2 px-[3px] outline-none focus-visible:ring-1 focus-visible:ring-black"
              type="button"
              data-testid="ShareModal-ShareLink">
              <div className="bg-neutral-200 relative flex h-12 w-12 items-center justify-center rounded-[320px]">
                <svg
                  viewBox="0 0 48 48"
                  className="h-12 w-12"
                  data-testid="ShareIcon-moreOptions"
                  // shape="circle"
                >
                  <circle cx="50%" cy="50%" r="50%" fill="#E0E2D9"></circle>
                  <svg viewBox="-16 -16 48 48">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className=" "
                      role="img"
                      aria-hidden="false"
                      aria-labelledby="ltclid2_title ">
                      <title id="ltclid2_title">Apple Share</title>
                      <path
                        fill="currentColor"
                        d="m10.65 3.85.35.36.7-.71-.35-.35-3-3h-.7l-3 3-.36.35.71.7.35-.35L7.5 1.71V10h1V1.7l2.15 2.15ZM1 5.5l.5-.5H4v1H2v9h12V6h-2V5h2.5l.5.5v10l-.5.5h-13l-.5-.5v-10Z"></path>
                    </svg>
                  </svg>
                </svg>
              </div>
              <div className="whitespace-nowrap text-center text-xs">More</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

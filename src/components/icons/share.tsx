export default function Share() {
  return (
    <svg
      viewBox="0 0 48 48"
      className="sm:h-12 w-8 h-8 sm:w-12"
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
  );
}

import { Button, Flex } from "@chakra-ui/react";

const ChevronLeft = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      class="bi bi-chevron-left"
      viewBox="0 0 16 16"
    >
      <path
        fill-rule="evenodd"
        d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
      />
    </svg>
  );
};

const ChevronRight = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      class="bi bi-chevron-right"
      viewBox="0 0 16 16"
    >
      <path
        fill-rule="evenodd"
        d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
      />
    </svg>
  );
};

const Pagination = ({ currentPage, totalPages, onSelect }) => {
  const middle = getMiddleRange(currentPage, totalPages);

  const prev = currentPage - 1 > 0 ? currentPage - 1 : undefined;

  const start = middle[0] !== 1 ? 1 : undefined;
  const startEllipsis = start && middle[0] - start > 1 ? start + 1 : undefined;

  const end = middle[1] !== totalPages ? totalPages : undefined;
  const endEllipsis = end && end - middle[1] > 1 ? middle[1] + 1 : undefined;

  const next = currentPage + 1 <= totalPages ? currentPage + 1 : undefined;

  const [middleFrom, middleTo] = middle;
  const PageButton = ({ page, ...restProps }) => {
    return (
      <Button
        onClick={() => {
          onSelect(page);
        }}
        border="none"
        variant="ghost"
        fontWeight={currentPage === page ? "bold" : "normal"}
        {...restProps}
      />
    );
  };

  return (
    <Flex alignItems="center">
      <Button
        border="none"
        variant="unstyled"
        cursor="pointer"
        isDisabled={Boolean(!prev)}
        onClick={() => {
          onSelect(prev);
        }}
        as={Flex}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <ChevronLeft />
      </Button>
      {start && <PageButton page={start}>{start}</PageButton>}
      {startEllipsis && <PageButton page={startEllipsis}>...</PageButton>}
      {Array.from(new Array(middleTo - middleFrom + 1))
        .map((_, i) => i + middleFrom)
        .map((p) => (
          <PageButton key={p} page={p}>
            {p}
          </PageButton>
        ))}
      {endEllipsis && <PageButton page={endEllipsis}>...</PageButton>}
      {end && <PageButton page={end}>{end}</PageButton>}
      <Button
        border="none"
        variant="unstyled"
        isDisabled={Boolean(!next)}
        cursor="pointer"
        onClick={() => {
          onSelect(next);
        }}
        as={Flex}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <ChevronRight />
      </Button>
    </Flex>
  );
};

function getMiddleRange(current, total) {
  if (total <= 3) {
    return [1, total];
  }

  // within two pages away from start
  if (current <= 2) {
    return [1, Math.min(4, total)];
  }

  // within two pages away to end
  if (current >= total - 2) {
    return [total - 3, total];
  }

  // normal  condition
  return [Math.max(current - 1, 1), Math.min(current + 1, total)];
}

export default Pagination;

export const paginationMapper = (curr: number, total: number) => {
  const firstPage = curr - 5 > 0 ? 1 : null;
  const lastPage = total - 4 > curr ? total : null;
  const middleSegment: number[] = [];
  const middleSegmentFrom = firstPage ? curr - 4 : 1;
  const middleSegmentTo = lastPage ? curr + 4 : total;
  for (let i = middleSegmentFrom; i <= middleSegmentTo; i++) {
    middleSegment.push(i);
  }
  return { firstPage, middleSegment, lastPage };
};

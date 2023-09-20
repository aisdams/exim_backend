export const parseCsv = (dataCsv: { buffer: Buffer }): string[][] => {
  const csvData: string = dataCsv.buffer.toString();
  const rows: string[] = csvData.split('\n').map((row) => row.trim());
  const parsedData: string[][] = [];

  rows.forEach((row) => {
    const values: string[] = row.split(',').map((value) => value.trim());
    parsedData.push(values);
  });

  return parsedData;
};

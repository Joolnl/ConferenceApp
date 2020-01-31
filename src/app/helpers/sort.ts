import { ScullyRoute } from '@scullyio/ng-lib';

export type SortResponse = 1 | -1;

export function sortByDate(a: DateType, b: DateType): SortResponse {
  if (new Date(b.date).getTime() > new Date(a.date).getTime()) {
    return 1;
  } else {
    return -1;
  }
}

interface DateObject {
  date: string; // yyyy-mm-dd
}

type DateType = DateObject | ScullyRoute;

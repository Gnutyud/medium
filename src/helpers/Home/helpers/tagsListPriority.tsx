import { TagType } from "../type/Type";
import { nanoid } from "@reduxjs/toolkit";

// helper method
const getTagsListPriority = (tagsList: string[], number: number): string[] => {
  const map = new Map();

  for (const tag of tagsList) {
    if (!map.has(tag)) map.set(tag, 1);
    else map.set(tag, map.get(tag) + 1);
  }

  const arraySort = [...map.entries()].sort((a, b) => b[1] - a[1]);
  const arrayResult = arraySort.map((a) => a[0]);

  if (number > tagsList.length) return arrayResult;
  return arrayResult.slice(0, number + 1);
};

// export method
export const getTagsList = (tagsList: string[]): TagType[] => {
  const tagsListPriority = getTagsListPriority(tagsList, 20);

  const result = tagsListPriority.map((tag) => ({
    id: nanoid(),
    tag: tag,
  }));

  return result;
};

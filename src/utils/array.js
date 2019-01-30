export const remove = (arr, item) => {
  removeMatching(arr, i => i === item);
}

// return true if removed
export const removeMatching = (arr, predicate) => {

  const matchingIndices = [];

  for (let i = arr.length - 1; i >= 0; i--) {
		const item = arr[i];

    if (predicate(item)) {
      matchingIndices.push(i);
    }
	}

	for (const i of matchingIndices) {
    arr.splice(i, 1);
  }

  return matchingIndices.length > 0;
}

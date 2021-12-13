export type TAccData = {
	data: number[][], 
	fold: {type: 'x' | 'y', index: number}[]
};

export type TBoard = Array<Array<'#' | '.'>>;
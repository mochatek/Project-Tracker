export interface Validatable {
    value: string|number,
    required?: boolean,
    min?: number,
    max?: number
}

export interface Draggable {
    handleDragStart: (event: DragEvent) => void
}

export interface Droppable {
    handleDragOver: (event: DragEvent) => void,
    handleDrop: (event: DragEvent) => void,
    handleDragLeave: (event: DragEvent) => void
}


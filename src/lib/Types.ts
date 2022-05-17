export type ProjectForm = [string, string, number]

export type Listener = (state: Project[]) => void

export type Project = {
    id: string,
    title: string,
    description: string,
    people: number,
    status: ProjectStatus
}

export enum ProjectStatus {
    ACTIVE = 'active',
    FINISHED = 'finished'
}

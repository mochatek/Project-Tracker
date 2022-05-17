import { ProjectStatus, Project} from '../lib/Types'
import { Droppable} from '../lib/Interfaces'
import Component from './Component'
import ProjectItem from './ProjectItem'
import store from '../Store'

export default class ProjectList extends Component<HTMLElement, HTMLElement>  implements Droppable {
    constructor(public templateId: string, public hostId: string, public type: ProjectStatus) {
        super(templateId, hostId)

        this.element.classList.add(type)
        this.element.querySelector('ul')!.id = `${this.type}-projects`
        this.element.querySelector('h3')!.innerText = `${this.type} projects`.toUpperCase()
    }

    configure(): void {
        this.element.addEventListener('dragover', this.handleDragOver.bind(this))
        this.element.addEventListener('drop', this.handleDrop.bind(this))
        this.element.addEventListener('dragleave', this.handleDragLeave.bind(this))


        store.subscribe((state) => {
            this.renderChildren(state)
        })
    }

    renderChildren(projects: Project[]) {
        const list: HTMLUListElement = this.element.querySelector('ul')! as HTMLUListElement
        list.innerHTML = ''
        projects.filter(project => project.status === this.type).forEach(({id, title, description, people, status}) =>
        new ProjectItem('project', `${status}-projects`, id, title, description, people, status))
    }

    handleDragOver(event: DragEvent): void {
        if(event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
            event.preventDefault()
            this.element.classList.add('droppable')
        }
    }

    handleDrop(event: DragEvent): void {
        const projectId: string = event.dataTransfer!.getData('text/plain')
        store.setState(store.state.map(project => {
            if(project.id === projectId && project.status !== this.type) {
                project.status = this.type
            }
            return project
        }))
        this.element.classList.remove('droppable')
    }

    handleDragLeave(_: DragEvent): void {
        this.element.classList.remove('droppable')
    }
}
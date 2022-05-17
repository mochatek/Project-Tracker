import { ProjectStatus} from '../lib/Types'
import { Draggable} from '../lib/Interfaces'
import Component from './Component'

export default class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {
    constructor(public templateId: string, public hostId: string, public id: string, public title: string, public description: string,
        public people: number, public status: ProjectStatus) {
        super(templateId, hostId)
        this.element.draggable = true

        this.renderChildren()
    }

    get persons(): string {
        return this.people <= 1? `👤 1`: `👥 ${this.people}`
    }

    configure(): void {
        this.element.addEventListener('dragstart', this.handleDragStart.bind(this))
    }

    renderChildren(): void {
        const h4: HTMLElement = this.element.querySelector('h4')! as HTMLElement
        h4.children[0]!.textContent = this.title
        h4.children[1]!.textContent = this.persons
        this.element.querySelector('p')!.innerText = this.description
    }

    handleDragStart(event: DragEvent): void {
        event.dataTransfer!.setData('text/plain', this.id)
        event.dataTransfer!.effectAllowed = "move"
    }
}

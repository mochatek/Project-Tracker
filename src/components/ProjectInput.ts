import {ProjectForm, ProjectStatus} from '../lib/Types'
import validate from '../util/Validator'
import Component from './Component'
import store from '../Store'

export default class ProjectInput extends Component<HTMLElement, HTMLFormElement> {
    constructor(public templateId: string, public hostId: string) {
        super(templateId, hostId)
    }

    private submitHandler(event: SubmitEvent) {
        event.preventDefault()
        const [title, description, people]: ProjectForm = this.getValues()
        if(validate({value: title, required: true},
            {value: description, required: true},
            {value: people, min: 1}
        )) {
            store.setState([...store.state, {
                id: Date.now().toString(), title, description, people, status: ProjectStatus.ACTIVE
            }])
            this.element.reset()
        }
    }

    private getValues(): ProjectForm {
        const title: string = (this.element.querySelector('#title')! as HTMLInputElement).value
        const description: string = (this.element.querySelector('#description')! as HTMLTextAreaElement).value
        const people: number = +(this.element.querySelector('#people')! as HTMLInputElement).value

        return [title, description, people]
    }

    configure(): void {
        this.element.addEventListener('submit', this.submitHandler.bind(this))
    }

    renderChildren(): void {}
}
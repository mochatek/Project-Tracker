export default abstract class Component<T extends HTMLElement, U extends HTMLElement> {
    private template: HTMLTemplateElement
    private host: T
    protected element: U

    constructor(public templateId: string, public hostId: string) {
        this.template = document.getElementById(templateId)! as HTMLTemplateElement
        this.host = document.getElementById(hostId)! as T

        const fragment: DocumentFragment = this.template.content.cloneNode(true) as DocumentFragment
        this.element = fragment.firstElementChild as U

        this.configure()
        this.render()
    }

    private render() {
        this.host.appendChild(this.element)
    }

    abstract configure(): void
    abstract renderChildren(children: unknown[]): void
}
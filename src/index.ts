import {ProjectStatus} from './lib/Types'
import ProjectInput from './components/ProjectInput'
import ProjectList from './components/ProjectList'


new ProjectInput('project-input', 'root')
new ProjectList('projects', 'root', ProjectStatus.ACTIVE)
new ProjectList('projects', 'root', ProjectStatus.FINISHED)



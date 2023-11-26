import { roles } from "../../MiddelWare/Auth.js"

export const endPoint = {
create: [roles.Admin],
getAll: [roles.Admin],
getActive: [roles.User],
update: [roles.Admin],
specific: [roles.User, roles.Admin]
}
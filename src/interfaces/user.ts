export class IUser {
  id: string;
  email?: string;
  name?: string;
  date_of_birth?: string;
  phone_number?: string;
  address?: string;

  constructor({
    id,
    email,
    name,
    date_of_birth,
    phone_number,
    address,
  }: IUser) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.date_of_birth = date_of_birth;
    this.phone_number = phone_number;
    this.address = address;
  }
}

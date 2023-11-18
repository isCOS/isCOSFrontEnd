export class user {
  name: string;
  surname: string;
  email: string;
  dateBirth: string;
  driveLicenceType: string;
  driveLicenceDeadLine: string;

  constructor(
    name: string,
    surname: string,
    email: string,
    dateBirth: string,
    driveLicenceType: string,
    driveLicenceDeadLine: string
  ) {
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.dateBirth = dateBirth;
    this.driveLicenceType = driveLicenceType;
    this.driveLicenceDeadLine = driveLicenceDeadLine;
  }

  //Function to add a new article
  addUser(name: string | undefined, surname: string | undefined, email: string | undefined, dateBirth: string | undefined, driveLicenceType: string | undefined, driveLicenceDeadLine: string | undefined) {
    this.name = name!;
    this.surname = surname!;
    this.email = email!;
    this.dateBirth = dateBirth!;
    this.driveLicenceType = driveLicenceType!;
    this.driveLicenceDeadLine = driveLicenceDeadLine!;
  }
}

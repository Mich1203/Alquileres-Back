export class IPlace {
  id?: string;
  capacity: number;
  measurements: number;
  measure_units: string;
  address: string;
  no_of_bathrooms: number;
  no_of_rooms: number;
  description: string;
  images: string[];
  price: number;

  constructor({
    id,
    capacity,
    measure_units,
    measurements,
    address,
    no_of_bathrooms,
    no_of_rooms,
    description,
    images,
    price,
  }: IPlace) {
    if (id) this.id = id;
    this.capacity = capacity;
    this.measurements = measurements;
    this.measure_units = measure_units;
    this.address = address;
    this.no_of_bathrooms = no_of_bathrooms;
    this.no_of_rooms = no_of_rooms;
    this.description = description;
    this.images = images;
    this.price = parseFloat(price.toString());
  }
}

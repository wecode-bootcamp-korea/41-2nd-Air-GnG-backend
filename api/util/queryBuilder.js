class QueryBuilder {
  constructor(themeId, maxGuest, roomType, bed, bedroom, bathroom, region, priceMin, priceMax, checkIn, checkOut, limit, offset) {
    this.limit = limit;
    this.offset = offset;

    this.whereParams = {
      ...(themeId && { themeId }),
      ...(maxGuest && { maxGuest }),
      ...(roomType && { roomType }),
      ...(bed && { bed }),
      ...(bedroom && { bedroom }),
      ...(bathroom && { bathroom }),
      ...(region && { region }),
      ...(priceMin && { priceMin }),
      ...(priceMax && { priceMax }),
      ...(checkIn && { checkIn }),
      ...(checkOut && { checkOut }),
    };

    this.whereMapper = {
      themeId: this.themeFilterBuilder,
      maxGuest: this.maxGuestFilterBuilder,
      roomType: this.roomTypeFilterBuilder,
      bed: this.bedFilterBuilder,
      bedroom: this.bedroomFilterBuilder,
      bathroom: this.bathroomFilterBuilder,
      region: this.regionFilterBuilder,
      priceMin: this.priceMinFilterBuilder,
      priceMax: this.priceMaxFilterBuilder,
      checkIn: this.checkInFilterBuilder,
      checkOut: this.checkOutFilterBuilder,
    };
  }

  createWhereClause() {
    const whereConditions = Object.entries(this.whereParams).map(([key, value]) => {
      return this.whereMapper[key](value);
    });

    return whereConditions.length !== 0 ? `WHERE ${whereConditions.join(' AND ')}` : '';
  }

  themeFilterBuilder(themeId) {
    return `r.theme_id = ${themeId}`;
  }

  maxGuestFilterBuilder(maxGuest) {
    return `r.maximum_people = ${maxGuest}`;
  }

  roomTypeFilterBuilder(roomType) {
    return `r.room_type_id = ${roomType}`;
  }

  bedFilterBuilder(bed) {
    return `r.bed_count = ${bed}`;
  }

  bedroomFilterBuilder(bedroom) {
    return `r.bedroom_count = ${bedroom}`;
  }

  bathroomFilterBuilder(bathroom) {
    return `r.bathroom_count = ${bathroom}`;
  }

  regionFilterBuilder(region) {
    return `r.region_id = ${region}`;
  }

  priceMinFilterBuilder(priceMin) {
    return `r.price BETWEEN ${priceMin}`;
  }

  priceMaxFilterBuilder(priceMax) {
    return `${priceMax}`;
  }

  checkInFilterBuilder(checkIn) {
    return `r.id NOT IN (SELECT room_id FROM bookings b WHERE b.check_in_date BETWEEN DATE('${checkIn}')`;
  }

  checkOutFilterBuilder(checkOut) {
    return `DATE('${checkOut}'))`;
  }

  createLimitClause() {
    return `GROUP BY r.id LIMIT ${Number(this.limit)} OFFSET ${Number(this.offset)}`;
  }

  buildQuery() {
    return `
		${this.createWhereClause()}
    ${this.createLimitClause()}
	`;
  }
}

module.exports = QueryBuilder;

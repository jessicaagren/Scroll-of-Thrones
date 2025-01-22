type Quote = {
    sentence: string
    character: {
      name: string
      slug: string
      house: {
        name: string
        slug: string
      }
    }
  }
  
  export default Quote;
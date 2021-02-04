import Utils from './utils'

describe('capitalizeText', () => {
  it('should capitalize text', () => {
    const text = 'pokemon'
    expect(Utils.capitalizeText(text)).toEqual('Pokemon')
  })
})

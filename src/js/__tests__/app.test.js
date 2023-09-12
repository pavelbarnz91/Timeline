import validitiInputGeolocation from "../validitiInputGeolocation.js";

describe('validitiInputGeolocation', () => {
    test('geolocation validation function test', () => {
      const result = validitiInputGeolocation('51.50851, -0.12572');
      expect(result.status).toBe(true);
      expect(result.coords).toBe('51.50851, -0.12572');
    });
  
    test('geolocation validation function test', () => {
      const result = validitiInputGeolocation('51.50851,-0.12572');
      expect(result.status).toBe(true);
      expect(result.coords).toBe('51.50851,-0.12572');
    });

    test('geolocation validation function test', () => {
      const result = validitiInputGeolocation('51.50851,0.12572');
      expect(result.status).toBe(true);
      expect(result.coords).toBe('51.50851,0.12572');
    });

    test('geolocation validation function test', () => {
      const result = validitiInputGeolocation('51.50851, 0.12572');
      expect(result.status).toBe(true);
      expect(result.coords).toBe('51.50851, 0.12572');
    });
  
    test('geolocation validation function test', () => {
      const result = validitiInputGeolocation('[51.50851, -0.12572]');
      expect(result.status).toBe(true);
      expect(result.coords).toBe('[51.50851, -0.12572]');
    });

    test('geolocation validation function test', () => {
      const result = validitiInputGeolocation('[51.50851,-0.12572]');
      expect(result.status).toBe(true);
      expect(result.coords).toBe('[51.50851,-0.12572]');
    });

    test('geolocation validation function test', () => {
      const result = validitiInputGeolocation('[51.50851,0.12572]');
      expect(result.status).toBe(true);
      expect(result.coords).toBe('[51.50851,0.12572]');
    });

    test('geolocation validation function test', () => {
      const result = validitiInputGeolocation('[51.50851, 0.12572]');
      expect(result.status).toBe(true);
      expect(result.coords).toBe('[51.50851, 0.12572]');
    });
  
    test('geolocation validation function test', () => {
      const result = validitiInputGeolocation('invalid input');
      expect(result.status).toBe(false);
    });
  });
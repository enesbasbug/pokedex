import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react'
import PokeList from './PokeList'

describe("PokeList", () => {
    it('renders a list of pokemon', () => {
        const mockPokemon = [
            {
                name: 'Bulbasaur',
                sprites: { front_shiny: 'bulbasaur-img-url' },
                base_experience: 64,
                types: [{ type: { name: 'grass' } }],
                abilities: [{ ability: { name: 'overgrow' } }],
                weight: 69
            },
        ];

        render(<PokeList pokemon={mockPokemon} />);

        // Test for Bulbasaur
        expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
        expect(screen.getByText('Base Experience:')).toBeInTheDocument();
        expect(screen.getByText('64')).toBeInTheDocument();
        // expect(screen.getByText('66')).toBeInTheDocument();
        expect(screen.getByText('Type:')).toBeInTheDocument();
        expect(screen.getByText('grass')).toBeInTheDocument();
        expect(screen.getByText('overgrow')).toBeInTheDocument();
        expect(screen.getByText('Weight: 69')).toBeInTheDocument();

        // Test for the image
        const image = screen.getByAltText('Pict');
        expect(image).toBeInTheDocument();
        expect(image.src).toContain('bulbasaur-img-url');

    });

});

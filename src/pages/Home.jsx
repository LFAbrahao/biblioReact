import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Alert } from 'react-bootstrap';
import * as bookService from '../api/bookService';
import BookCard from '../components/BookCard';
import Spinner from '../components/Spinner';

function Home() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]); // Estado para armazenar os livros filtrados
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState(''); // Novo estado para o gênero
  const [genres, setGenres] = useState([]); // Para armazenar os gêneros disponíveis
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setIsLoading(true);
        const data = await bookService.getAllBooks();
        setBooks(data); // Armazena todos os livros
        setFilteredBooks(data); // Inicializa a lista filtrada com todos os livros
        setGenres([...new Set(data.map(book => book.genre))]); // Cria a lista de gêneros únicos
        setError(null);
      } catch (err) {
        setError('Falha ao buscar os livros. Tente novamente mais tarde.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, []);

  // Filtra os livros com base no termo de busca e no gênero selecionado
  useEffect(() => {
    const filtered = books.filter((book) => {
      // Filtra por título ou autor
      const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            book.author.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Filtra por gênero, se um gênero for selecionado
      const matchesGenre = selectedGenre ? book.genre === selectedGenre : true;

      return matchesSearch && matchesGenre;
    });

    setFilteredBooks(filtered); // Atualiza a lista filtrada
  }, [searchTerm, selectedGenre, books]); // Re-executa sempre que o searchTerm, selectedGenre ou books mudar

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <h1>Catálogo de Livros</h1>

          {/* Campo de busca por título ou autor */}
          <Form.Control
            type="text"
            placeholder="Buscar por título ou autor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
      </Row>

      <Row className="mb-4">
        <Col>
          {/* Seletor de gênero */}
          <Form.Control
            as="select"
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
          >
            <option value="">Todos os gêneros</option>
            {genres.map((genre) => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </Form.Control>
        </Col>
      </Row>

      {error && <Alert variant="danger">{error}</Alert>}
      
      {!error && filteredBooks.length === 0 && (
        <Alert variant="info">Nenhum livro encontrado com o termo "{searchTerm}" e gênero "{selectedGenre}".</Alert>
      )}

      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {filteredBooks.map((book) => (
          <Col key={book.id}>
            <BookCard book={book} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Home;

import React, { useState } from "react";
import Axios from "axios";
import styled from "styled-components";
import Movie from "./components/Movie";
import MovieInfoC from "./components/MovieInfoC";
import LoginButton from "./components/LoginButton";


const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: black;
`;
const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const Header = styled.div`
  background-color: #A9A9A9;
  color: white;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  font-size: 25px;
  font-weight: bold;
  box-shadow: 0 3px 6px 0 #555;
`;
const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px 10px;
  border-radius: 6px;
  margin-left: 20px;
  width: 50%;
  background-color: white;
`;
const SearchIcon = styled.img`
  width: 32px;
  height: 32px;
`;
const MovieImage = styled.img`
  width: 48px;
  height: 48px;
  margin: 15px;
`;
const SearchInput = styled.input`
  color: black;
  font-size: 16px;
  font-weight: bold;
  border: none;
  outline: none;
  margin-left: 15px;
`;
const MovieListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 25px;
  justify-content: space-evenly;
  
`;
const Placeholder = styled.video`
  width: 100%;
  height: 100%;
  margin: 1rem;
  opacity: 50%;
`;
const Footer = styled.div`
display: flex;
flex-direction: column;
background-color: palevioletred;
color: white;
margin: 2rem 0 0 0;
bottom: 0;
width: 100%;
  `;
const FooterInfo = styled.div`
  display: flex;
  flex-direction: row;
  list-style: none;
  padding: 2rem;
  justify-content: space-around;
  align-items: center;
  `;
const FooterInfoList = styled.li`
  font-size: 1rem; 
  list-style: none;
  &:hover{
    opacity: 0.5;
    fill: rebeccapurple;
  } 
  `;
const FooterCopyRight = styled.li`
  text-align: center;
  padding-right: 2rem;
  padding-bottom: 2rem;
  list-style: none;
  &:hover{
    opacity: 0.5;
  }
  `;

export const API_KEY = '1ac3c796';

function App() {
  const [searchQuery, updateSearchQuery] = useState("");

  const [movieList, updateMovieList] = useState([]);
  const [selectedMovie, onMovieSelect] = useState();

  const [timeoutId, updateTimeoutId] = useState();

  const currentDate = new Date();
	const ThisYear = currentDate.getFullYear();

  const fetchData = async (searchString) => {
    const response = await Axios.get(
      `https://www.omdbapi.com/?s=${searchString}&apikey=${API_KEY}`,
    );
    updateMovieList(response.data.Search);
  };

  const onTextChange = (e) => {
    onMovieSelect("")
    clearTimeout(timeoutId);
    updateSearchQuery(e.target.value);
    const timeout = setTimeout(() => fetchData(e.target.value), 500);
    updateTimeoutId(timeout);
  };
  return (
    <Container>
      <Header>
        <AppName>
          <MovieImage src="/movie-icon.png" />
          My React Movie App
        </AppName>
        {/* <LoginButton /> */}
        <SearchBox>
          <SearchIcon src="/search-icon.png" />
          <SearchInput
            placeholder="Search Movie"
            value={searchQuery}
            onChange={onTextChange}
          />
        </SearchBox>
      </Header>
      {selectedMovie && <MovieInfoC selectedMovie={selectedMovie} onMovieSelect={onMovieSelect}/>}
      <MovieListContainer>
        {movieList.length > 0 ? (
          movieList.map((movie, index) => (
            <Movie
              key={index}
              movie={movie}
              onMovieSelect={onMovieSelect}
            />
          ))
        ) : (
          <Placeholder source controls src="/apocalyptic.mp4" type="video/mp4" />
    
        ) }
      </MovieListContainer> 
        <Footer>
          <FooterInfo>
              <FooterInfoList>Mobile App</FooterInfoList>
              <FooterInfoList>Community</FooterInfoList>
              <FooterInfoList>FAQ</FooterInfoList>
              <FooterInfoList>Help desk</FooterInfoList>
              <FooterInfoList>Blog</FooterInfoList>
              <FooterInfoList>Developer API</FooterInfoList>
          </FooterInfo>
          <FooterCopyRight>
             <hr style={{paddingRight:'2.2rem'}}></hr>
              {ThisYear> 2022 ? <span>`2022 - ${ThisYear}`</span> : <span>{ThisYear}</span>} An Educational Exercise During the Multiverse Bootcamp.
          </FooterCopyRight>
      </Footer> 
    </Container>
      );
}

export default App;

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CreateNewGame from '../components/CreateNewGame';
import EditGame from '../components/EditGame';
import Header from '../components/Header';
import MatchesBtn from '../components/MatchesBtn';
import Loading from '../components/Loading';
import api, { requestData, setToken } from '../services/requests';
import '../styles/pages/matchSettings.css';

const MatchSettings = () => {
  const [teams, setTeams] = useState([]);
  const [homeTeamScoreboard, setHomeTeamScoreboard] = useState('0');
  const [awayTeamScoreboard, setAwayTeamScoreboard] = useState('0');
  const [homeTeam, setHomeTeam] = useState('');
  const [awayTeam, setAwayTeam] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const storage = JSON.parse(localStorage.getItem('user'));

      if (!storage) return navigate('/');

      const { token } = storage;

      setToken(token);
      api.get('/login/validate')
        .then(() => setIsAuthenticated(true))
        .catch(() => navigate('/'));
    })();
  }, [navigate]);

  useEffect(() => {
    const endpoint = '/teams';

    const { token } = JSON.parse(localStorage.getItem('user')) || { token: '' };
    if (token !== '') {
      setToken(token);
    }
    if (!teams.length) {
      requestData(endpoint)
        .then((response) => {
          setTeams(response);
        })
        .catch((error) => console.log(error));
    }
  });

  const getTeam = (team, homeOrAway) => {
    const { id } = teams.find(({ teamName }) => teamName === team);
    if (homeOrAway === 'homeTeam') { setHomeTeam(id); } else { setAwayTeam(id); }
  };

  const createMatch = async (inProgress) => {
    const body = {
      homeTeam: +homeTeam,
      awayTeam: +awayTeam,
      homeTeamGoals: +homeTeamScoreboard,
      awayTeamGoals: +awayTeamScoreboard,
      inProgress,
    };

    const { data } = await api.post('/matches', body);
    return data;
  };

  const updateMatch = async (id, updateGoals) => {
    await api.patch(`/matches/${id}`, { ...updateGoals });
  };
  const finishMatch = async (id) => {
    await api.patch(`/matches/${id}/finish`);
  };

  if (!isAuthenticated) return <Loading />;

  if (location.state) {
    const { id,
      teamHome: homeTeamState,
      homeTeamGoals,
      teamAway: awayTeamState,
      awayTeamGoals,
    } = location.state;
    return (
      <>
        <Header
          page="EDITAR PARTIDA"
          FirstNavigationLink={ MatchesBtn }
          logged={ isAuthenticated }
          setLogin={ setIsAuthenticated }
        />
        <EditGame
          homeTeam={ [homeTeamState] }
          awayTeam={ [awayTeamState] }
          homeTeamGoals={ homeTeamGoals }
          awayTeamGoals={ awayTeamGoals }
          idMatch={ id }
          updateMatch={ updateMatch }
          finishMatch={ finishMatch }
          getTeam={ getTeam }
        />
      </>
    );
  }

  return (
    <>
      <Header
        page="ADICIONAR PARTIDA"
        FirstNavigationLink={ MatchesBtn }
        logged={ isAuthenticated }
        setLogin={ setIsAuthenticated }
      />
      <CreateNewGame
        setHomeTeamScoreboard={ setHomeTeamScoreboard }
        setAwayTeamScoreboard={ setAwayTeamScoreboard }
        teams={ teams }
        getTeam={ getTeam }
        createMatch={ createMatch }
        finishMatch={ finishMatch }
      />
    </>
  );
};

export default MatchSettings;

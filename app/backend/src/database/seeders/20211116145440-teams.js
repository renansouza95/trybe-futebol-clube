module.exports = {
  up: async (queryInterface) => {
    /**
     * Add seed commands here.
     *
     * Example:
     */
    await queryInterface.bulkInsert(
      'teams',
      [
        {
          team_name: 'Avaí/Kindermann',
        },
        {
          team_name: 'Bahia',
        },
        {
          team_name: 'Botafogo',
        },
        {
          team_name: 'Corinthians',
        },
        {
          team_name: 'Cruzeiro',
        },
        {
          team_name: 'Ferroviária',
        },
        {
          team_name: 'Flamengo',
        },
        {
          team_name: 'Grêmio',
        },
        {
          team_name: 'Internacional',
        },
        {
          team_name: 'Minas Brasília',
        },
        {
          team_name: 'Napoli-SC',
        },
        {
          team_name: 'Palmeiras',
        },
        {
          team_name: 'Real Brasília',
        },
        {
          team_name: 'Santos',
        },
        {
          team_name: 'São José-SP',
        },
        {
          team_name: 'São Paulo',
        },
      ],
      {},
    );
  },

  down: async (queryInterface) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
    await queryInterface.bulkDelete('teams', null, {});
  },
};

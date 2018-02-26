 axios.get('/api/mongoose/import/cards')
        .then(response => {
            console.log(response.data)
            // this.setState({
            //     decks: response.data
            // })
        })

        axios.post('/api/card/update', {
            format: 'wild',
            hero: 'shaman',
            cards: ['5a8b0aa8eabdf52aa479953d']
        })
        .then(result => {
            console.log(result)
        })

        axios.post('/update/hearthpwn', {
            cardId: card,
            hero
        })
        .then(response => {
            console.log(response.data)
            this.setState({
                decks: response.data
            })
        })

        axios.get('/api/cards/collectible')
        console.log(response)        
        .then(response => {
            this.setState({
                cards: response.data
            })
        })

         axios.get('/api/lightforge')
        .then(result => {
            console.log(result)
        })
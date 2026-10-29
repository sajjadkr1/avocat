
jest.mock('./config/db', () => ({
    query: jest.fn()
}));

const dt = require('./config/db');

const {
    registerUtilisateur
} = require('./controllers/utilisateur.controller');

const {
    updateStatutRendezVous
} = require('./controllers/admin.controller');

beforeEach(() => {
    jest.clearAllMocks();
});

test('un statut invalide doit retourner 400', () => {
    const req = {
        params: { id: '1' },
        body: { statut: 'inconnu' }
    };

    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
    };

    updateStatutRendezVous(req, res);

    expect(res.status).toHaveBeenCalledWith(400);

    expect(res.json).toHaveBeenCalledWith({
        error: 'Statut invalide'
    });

    expect(dt.query).not.toHaveBeenCalled();
});

test('un email invalide doit retourner 400 lors de l’inscription', async () => {
    const req = {
        body: {
            nom: 'Test',
            prenom: 'User',
            email: 'testgmail.com',
            mot_de_passe: 'MotDePasse123',
            telephone: '0123456789'
        }
    };

    const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
    };

    await registerUtilisateur(req, res);

    expect(res.status).toHaveBeenCalledWith(400);

    expect(res.json).toHaveBeenCalledWith({
        error: 'Adresse email invalide'
    });

    expect(dt.query).not.toHaveBeenCalled();
});

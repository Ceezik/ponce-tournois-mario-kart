import Input from '../form/Input';
import EditParticipationForm from './EditParticipationForm';

function ParticipationPointsForm({ closeForm, nbMaxRaces, participation }) {
    const maxPoints = nbMaxRaces * 15;
    const NB_POINTS_VALIDATION = `Veuillez entrer un nombre compris entre 1 et ${maxPoints}`;

    return (
        <EditParticipationForm
            closeForm={closeForm}
            participation={participation}
        >
            <Input
                label="Nombre de points (saisie manuelle)"
                name="nbPoints"
                type="number"
                autoFocus
                defaultValue={participation.nbPoints}
                validationSchema={{
                    min: {
                        value: 1,
                        message: NB_POINTS_VALIDATION,
                    },
                    max: {
                        value: maxPoints,
                        message: NB_POINTS_VALIDATION,
                    },
                }}
            />
        </EditParticipationForm>
    );
}

export default ParticipationPointsForm;

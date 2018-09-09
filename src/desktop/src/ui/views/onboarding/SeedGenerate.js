/* global Electron */
import React from 'react';
import PropTypes from 'prop-types';
import { translate, Interpolate } from 'react-i18next';
import { createRandomSeed, randomBytes } from 'libs/crypto';
import { capitalize, tritToChar } from 'libs/helpers';
import { MAX_SEED_LENGTH } from 'libs/iota/utils';

import Button from 'ui/components/Button';
import Icon from 'ui/components/Icon';

import css from './index.scss';

/**
 * Onboarding, Seed generation component
 */
class GenerateSeed extends React.PureComponent {
    static propTypes = {
        /** @ignore */
        history: PropTypes.shape({
            push: PropTypes.func.isRequired,
        }).isRequired,
        /** @ignore */
        t: PropTypes.func.isRequired,
    };

    state = {
        seed: Electron.getOnboardingSeed() || createRandomSeed(),
        scramble: Electron.getOnboardingSeed() ? new Array(MAX_SEED_LENGTH).fill(0) : randomBytes(MAX_SEED_LENGTH, 27),
        existingSeed: Electron.getOnboardingSeed(),
        clicks: [],
    };

    componentDidMount() {
        this.frame = 0;
        this.unscramble();
    }

    componentWillUnmount() {
        this.frame = -1;
    }

    onUpdatedSeed = (seed) => {
        this.setState(() => ({
            seed,
        }));
    };

    onRequestNext = () => {
        const { history } = this.props;
        const { seed } = this.state;

        Electron.setOnboardingSeed(seed, true);
        history.push('/onboarding/account-name');
    };

    onRequestPrevious = () => {
        const { history } = this.props;

        this.generateNewSeed();

        history.push('/onboarding/seed-intro');
    };

    /**
     * Update individual seed byte to random
     * @param {event} event - Click event
     * @param {number} position - Letter seed position index
     * @returns {undefined}
     */
    updateLetter = (e) => {
        const { seed, clicks, scramble } = this.state;

        const position = e.target.value;

        const newClicks = clicks.indexOf(position) < 0 ? clicks.concat([position]) : clicks;

        const newSeed = seed.slice(0);
        newSeed[position] = createRandomSeed(1)[0];

        scramble[position] = 64;

        this.setState(() => ({
            seed: newSeed,
            clicks: newClicks,
            scramble: scramble,
        }));

        this.unscramble();
    };

    /**
     * Generate random seed and initiate seed generation animation sequence
     * @returns {undefined}
     */
    generateNewSeed = () => {
        const newSeed = createRandomSeed();
        Electron.setOnboardingSeed(null);

        this.setState(() => ({
            seed: newSeed,
            existingSeed: false,
            clicks: [],
        }));

        this.frame = 0;

        this.setState({
            scramble: randomBytes(MAX_SEED_LENGTH, 27),
        });

        this.unscramble();
    };

    /**
     * Seed generation animation sequence step
     * @returns {undefined}
     */
    unscramble() {
        const { scramble } = this.state;

        if (this.frame < 0) {
            return;
        }

        const scrambleNew = [];
        let sum = -1;

        if (this.frame > 2) {
            sum = 0;

            for (let i = 0; i < scramble.length; i++) {
                sum += scramble[i];
                scrambleNew.push(Math.max(0, scramble[i] - 15));
            }

            this.setState({
                scramble: scrambleNew,
            });

            this.frame = 0;
        }

        this.frame++;

        if (sum !== 0) {
            requestAnimationFrame(this.unscramble.bind(this));
        }
    }

    render() {
        const { t } = this.props;
        const { seed, scramble, existingSeed, clicks } = this.state;

        const clicksLeft = 10 - clicks.length;

        return (
            <form>
                <section className={css.wide}>
                    <h1>{t('newSeedSetup:generatedSeed')}</h1>
                    <Interpolate
                        i18nKey="newSeedSetup:individualLetterCount"
                        letterCount={
                            !existingSeed && clicksLeft > 0 ? (
                                <strong className={css.highlight}>{!existingSeed ? clicksLeft : 0}</strong>
                            ) : null
                        }
                    >
                        <p>
                            Press <strong /> individual letters to randomise them.
                        </p>
                    </Interpolate>
                    <div className={css.seed}>
                        <div>
                            {seed.map((trit, index) => {
                                const offset = scramble[index];
                                const letter =
                                    offset > 0 ? '9ABCDEFGHIJKLMNOPQRSTUVWXYZ'.charAt(offset % 27) : tritToChar(trit);
                                return (
                                    <button
                                        onClick={this.updateLetter}
                                        key={`${index}${letter}`}
                                        value={index}
                                        style={{ opacity: 1 - offset / 255 }}
                                    >
                                        {letter}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                    <Button type="button" onClick={this.generateNewSeed} className="icon">
                        <Icon icon="sync" size={32} />
                        {capitalize(t('newSeedSetup:pressForNewSeed'))}
                    </Button>
                </section>
                <footer>
                    <Button onClick={this.onRequestPrevious} className="square" variant="dark">
                        {t('goBackStep')}
                    </Button>
                    <Button
                        disabled={!existingSeed && clicksLeft > 0}
                        onClick={this.onRequestNext}
                        className="square"
                        variant="primary"
                    >
                        {!existingSeed && clicksLeft > 0
                            ? `Randomise ${clicksLeft} characters to continue`
                            : t('continue')}
                    </Button>
                </footer>
            </form>
        );
    }
}

export default translate()(GenerateSeed);

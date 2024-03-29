import { ButtonWithSpinner } from '@/components/buttons/ButtonWithSpinner';
import TextArea from '@/components/text/TextArea';
import TextInput from '@/components/text/TextInput';
import frontendClient from '@/lib/client/frontendClient';
import { ImageWizardContextType, ImageWizardContext, TextPrompts } from '@/lib/contexts/ImageWizardContext';
import { GenerateTextRequest, GenerateTextResponse } from '@/lib/controllers/GenerateIdeasController';
import { calculateTextGenerationCost, extimateCreditExpenseFromText } from '@/lib/serviceCosts/openAiCosts';
import { ChangeEvent, useContext, useEffect, useState } from 'react';

const formatPrompt = (prompt: string) => {
    const trimmedPrompt = prompt.trim();
    if (trimmedPrompt.trim().length === 0) {
        return 'Provide 5 interesting original ideas that would produce visually interesting images if provided to an image generation AI? These ideas need to be reasonably detailed and no longer than 50 words';
    }

    return `Provide 5 interesting original ideas that would produce visually interesting images if provided to an image generation AI related to: ${trimmedPrompt}`;
};

export const InitialStep = () => {
    const { setShowProceedButton, textPrompts, setTextPrompts } = useContext<ImageWizardContextType>(ImageWizardContext);
    const [currentCost, setCurrentCost] = useState<number>(0);
    const [helpGenIdeasPrompt, setHelpGenIdeasPrompt] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    useEffect(() => {
        if (setShowProceedButton) {
            setShowProceedButton(textPrompts.whatDoYouWantToBuild.length > 0);
        }
    }, [textPrompts.whatDoYouWantToBuild, setShowProceedButton]);

    const onGenIdeasPromptChange = (e: ChangeEvent<HTMLInputElement>) => {
        const text = e.target.value;
        setHelpGenIdeasPrompt(text);

        const creditCost = extimateCreditExpenseFromText(text);
        setCurrentCost(creditCost);
    };

    const onGenerateIdeasClick = async () => {
        setLoading(true);
        try {
            const prompt = formatPrompt(helpGenIdeasPrompt);
            const response = await frontendClient.post<GenerateTextRequest, GenerateTextResponse>('create/text-completion', { prompt });
            const firstChoice = response.choices[0];
            if (setTextPrompts) {
                setTextPrompts((cur) => {
                    return {
                        ...cur,
                        whatDoYouWantToBuild:
                            'Here are a few ideas you might find reasonable: \n' +
                            firstChoice
                                .trim()
                                .split('\n')
                                .filter((x: string) => x.trim().length > 0 && x !== '.' && x !== 'each.')
                                .join('\n')
                    };
                });
            }
        } catch {
            // do nothing
        } finally {
            setLoading(false);
        }
    };

    return (
        <div aria-label="left side of the screen" className="mx-auto flex w-full flex-col border-r-indigo-400">
            <div className="w-full">
                <div className="my-12 flex w-full flex-col justify-center">
                    <TextArea
                        value={textPrompts.whatDoYouWantToBuild}
                        label="Describe for us what you'd like to create..."
                        onChange={(e) => {
                            if (setTextPrompts) {
                                setTextPrompts((cur) => {
                                    return { ...cur, whatDoYouWantToBuild: e.target.value } as TextPrompts;
                                });
                            }
                        }}
                    />
                    <div className="space-around mt-2 flex w-full flex-row items-center">
                        <ButtonWithSpinner onClick={onGenerateIdeasClick} className="m-2" loading={loading}>
                            Help me generate ideas Est.: {currentCost}c
                        </ButtonWithSpinner>
                        <div className="w-full">
                            <label htmlFor="genIdeasPrompt" className="text-xs">
                                Optional: Provide some thoughts
                            </label>
                            <TextInput id="genIdeasPrompt" onChange={onGenIdeasPromptChange} value={helpGenIdeasPrompt} />
                        </div>
                    </div>
                </div>
                {/* <div className="my-12 flex w-full justify-center">
                    <TextArea
                        value={textPrompts.whatTypeOfProduct}
                        label="What type of product are you creating?"
                        onChange={(e) => {
                            if (setTextPrompts) {
                                setTextPrompts((cur) => {
                                    return { ...cur, whatTypeOfProduct: e.target.value } as TextPrompts;
                                });
                            }
                        }}
                    />
                </div>
                <div className="my-12 flex w-full justify-center">
                    <TextArea
                        value={textPrompts.whoIsTheProductTargetedAt}
                        label="Who is this product targeted at?"
                        onChange={(e) => {
                            if (setTextPrompts) {
                                setTextPrompts((cur) => {
                                    return { ...cur, whoIsTheProductTargetedAt: e.target.value } as TextPrompts;
                                });
                            }
                        }}
                    />
                </div>
                <div className="my-12 flex w-full justify-center">
                    <TextArea
                        value={textPrompts.howDoesThisProductStandOut}
                        label="How does this product stand out?"
                        onChange={(e) => {
                            if (setTextPrompts) {
                                setTextPrompts((cur) => {
                                    return { ...cur, howDoesThisProductStandOut: e.target.value } as TextPrompts;
                                });
                            }
                        }}
                    />
                </div> */}
            </div>
        </div>
    );
};

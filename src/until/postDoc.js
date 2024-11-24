import * as S from "../page/particularContent/PostContent/style";

export default function make(text = "") {
    const tagPatterns = [
        {
            pattern: /<제목1>(.*?)<\/제목1>/,
            component: (text) => <S.H1>{text}</S.H1>,
        },
        {
            pattern: /<제목2>(.*?)<\/제목2>/,
            component: (text) => <S.H2>{text}</S.H2>,
        },
        {
            pattern: /<제목3>(.*?)<\/제목3>/,
            component: (text) => <S.H3>{text}</S.H3>,
        },
        {
            pattern: /<강조>(.*?)<\/강조>/,
            component: (text) => <strong>{text}</strong>,
        },
        {
            pattern: /<밑줄>(.*?)<\/밑줄>/,
            component: (text) => <S.underLine>{text}</S.underLine>,
        },
        {
            pattern: /<기울임>(.*?)<\/기울임>/,
            component: (text) => <i>{text}</i>,
        },
        {
            pattern: /<취소선>(.*?)<\/취소선>/,
            component: (text) => <S.cancelLine>{text}</S.cancelLine>,
        },
    ];

    function parseText(inputText) {
        if (!inputText) return null;

        // 가장 먼저 매칭되는 태그를 찾음
        let earliestMatch = null;
        let matchComponent = null;

        tagPatterns.forEach(({ pattern, component }) => {
            const match = inputText.match(pattern);
            if (match && (!earliestMatch || match.index < earliestMatch.index)) {
                earliestMatch = match;
                matchComponent = component;
            }
        });

        // 매칭된 태그가 없으면 단순 텍스트 반환
        if (!earliestMatch) return inputText;

        const [fullMatch, innerText] = earliestMatch;
        const prefixText = inputText.slice(0, earliestMatch.index);
        const suffixText = inputText.slice(earliestMatch.index + fullMatch.length);

        return (
            <>
                {prefixText && parseText(prefixText)}
                {matchComponent(parseText(innerText))}
                {suffixText && parseText(suffixText)}
            </>
        );
    }

    const lines = text.split("\n").map((line, index) => (
        <div key={index}>{parseText(line)}</div>
    ));

    return <S.div>{lines}</S.div>;
}
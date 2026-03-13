package org.levenj.aicodetest.core.parser;

import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.levenj.aicodetest.ai.model.HtmlCodeResult;
import org.levenj.aicodetest.ai.model.MultiFileCodeResult;

import static org.junit.jupiter.api.Assertions.*;

@Slf4j
class CodeParserExecutorTest {

    private static final HtmlCodeParser parseHtmlCode = new HtmlCodeParser();

    private static final MultiFileCodeParser parseMultiFileCode = new MultiFileCodeParser();

    @Test
    void parseHtmlCode() {
        String codeContent = """
                随便写一段描述：
                ```html
                <!DOCTYPE html>
                <html>
                <head>
                    <title>测试页面</title>
                </head>
                <body>
                    <h1>Hello World!</h1>
                </body>
                </html>
                ```
                随便写一段描述
                """;
        HtmlCodeResult result = parseHtmlCode.parseCode(codeContent);
        log.info("HTML代码：{}", result.getHtmlCode());
        assertNotNull(result);
        assertNotNull(result.getHtmlCode());
    }

    @Test
    void parseMultiFileCode() {
        String codeContent = """
                创建一个完整的网页：
                ```html
                <!DOCTYPE html>
                <html>
                <head>
                    <title>多文件示例</title>
                    <link rel="stylesheet" href="style.css">
                </head>
                <body>
                    <h1>欢迎使用</h1>
                    <script src="script.js"></script>
                </body>
                </html>
                ```
                ```css
                h1 {
                    color: blue;
                    text-align: center;
                }
                ```
                ```js
                console.log('页面加载完成');
                ```
                文件创建完成！
                """;
        MultiFileCodeResult result = parseMultiFileCode.parseCode(codeContent);
        log.info("HTML代码：{}", result.getHtmlCode());
        log.info("CSS代码：{}", result.getCssCode());
        log.info("JS代码：{}", result.getJsCode());
        assertNotNull(result);
        assertNotNull(result.getHtmlCode());
        assertNotNull(result.getCssCode());
        assertNotNull(result.getJsCode());
    }
}
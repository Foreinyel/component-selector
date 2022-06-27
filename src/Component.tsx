import React, { useState } from "react";
// import { PlusOutlined } from "@ant-design/icons";
// import { Button, Modal, Table, Tag } from "antd";
import { useCompList } from "./context";
import { ComponentModel } from "./typing";
import css from "./index.less";
import Button from "antd/es/button";
import Modal from "antd/es/modal";
import Table from "antd/es/table";
import Tag from "antd/es/tag";
export interface ComponentSelectorProps {
  value?: number[];
  onChange?: (value: number[]) => void;
}

export const ComponentSelector = (props: ComponentSelectorProps) => {
  const { value, onChange } = props;
  const { components } = useCompList();
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState<number[]>([]);
  return (
    <div className={css.componentSelector}>
      {value?.length
        ? value.map((item) => {
            const comp = components.find((c) => c.id === item);
            return (
              <Tag
                closable
                onClose={() => {
                  if (onChange) {
                    onChange((value || []).filter((v) => v !== item));
                  }
                }}
                key={item}
              >
                {comp!.name}
              </Tag>
            );
          })
        : null}
      <Button
        size="small"
        onClick={() => {
          setSelected(value || []);
          setVisible(true);
        }}
        // type="primary"
        shape="circle"
        // icon={<PlusOutlined />}
      >
        +
      </Button>
      <Modal
        width={600}
        title="请选择"
        visible={visible}
        onCancel={() => setVisible(false)}
        onOk={() => {
          if (onChange) {
            onChange(selected);
            setVisible(false);
          }
        }}
      >
        <Table
          rowSelection={{
            type: "checkbox",
            getCheckboxProps: (record: ComponentModel) => ({
              // disabled: record.name === "Disabled User",
              name: record.name,
              // checked: selected.includes(record.id),
              selectedRowKeys: selected,
            }),
            onChange: (selectedRowKeys: React.Key[]) => {
              // const selectedKeys = new Set([...selected, ...selectedRowKeys]);
              // setSelected(Array.from(selectedKeys));
              setSelected(selectedRowKeys as unknown as number[]);
            },
          }}
          columns={[
            {
              title: "组件名",
              dataIndex: "name",
            },
          ]}
          dataSource={components}
          rowKey="id"
        ></Table>
      </Modal>
    </div>
  );
};

export default ComponentSelector;
